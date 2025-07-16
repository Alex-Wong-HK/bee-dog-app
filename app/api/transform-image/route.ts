import { NextRequest, NextResponse } from 'next/server';

// Configuration constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface TransformResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

// Rate limiting (simple in-memory store for demo)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  
  // Remove old requests outside the window
  const validRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  return true;
}

async function validateImage(file: File): Promise<{ isValid: boolean; error?: string }> {
  // Check file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { 
      isValid: false, 
      error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(', ')}` 
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { 
      isValid: false, 
      error: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB` 
    };
  }

  // Basic image validation by reading file header
  try {
    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    
    // Check for common image file signatures
    const isJPEG = uint8Array[0] === 0xFF && uint8Array[1] === 0xD8;
    const isPNG = uint8Array[0] === 0x89 && uint8Array[1] === 0x50 && uint8Array[2] === 0x4E && uint8Array[3] === 0x47;
    const isWebP = uint8Array[8] === 0x57 && uint8Array[9] === 0x45 && uint8Array[10] === 0x42 && uint8Array[11] === 0x50;
    
    if (!isJPEG && !isPNG && !isWebP) {
      return { isValid: false, error: 'File does not appear to be a valid image' };
    }
    
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Failed to validate image file' };
  }
}

async function transformImageWithAI(
  imageBuffer: ArrayBuffer, 
  customPrompt?: string,
  inferenceSteps: number = 30,
  guidanceScale: number = 12,
  strength: number = 0.9
): Promise<string> {
  // Use Replicate API via Hugging Face Router (Free tier: 30k requests/month)
  const apiKey = process.env.HUGGING_FACE_API_KEY || 'hf_********';
  
  if (!apiKey) {
    throw new Error('API key not configured');
  }
  
  try {
    return await transformWithReplicate(imageBuffer, apiKey, customPrompt, inferenceSteps, guidanceScale, strength);
  } catch (error) {/*  */
    console.error('Replicate transformation failed:', error);
    throw new Error('Image transformation failed. Please try again later.');
  }
}

// Replicate API via Hugging Face Router (Image-to-Image)
async function transformWithReplicate(
  imageBuffer: ArrayBuffer, 
  apiKey: string, 
  customPrompt?: string,
  inferenceSteps: number = 30,
  guidanceScale: number = 12,
  strength: number = 0.9
): Promise<string> {
  // Default AI Prompt for bee sting swelling effect
  const defaultPrompt = `
Transform this anime character to have a swollen face from bee stings. Key changes needed:
- Puffy, swollen cheeks and face (not fat, but inflamed/swollen like allergic reaction)
- Closed mouth with a pitiful, wronged expression
- Slightly droopy or sad eyes showing distress
- Add cute cartoon bees around the character
- Keep the same art style and character design
- Face should look like it was stung by bees - puffy and inflamed(serious and exaggerated)
- Expression should be pouty and pitiful, like feeling sorry for themselves
- Maintain the black and white radial background
`;
  
  const prompt = customPrompt || defaultPrompt;
  console.log('🆓 Using FREE Replicate API via Hugging Face Router (Image-to-Image)...');
  console.log('Prompt:', prompt);
  console.log('Parameters:', { inferenceSteps, guidanceScale, strength });
  
  // Convert image to base64 format as shown in the corrected example
  const base64Image = Buffer.from(imageBuffer).toString('base64');
  const imageDataUrl = `data:image/png;base64,${base64Image}`;
  
  // Prepare the request body in the correct format for Replicate API
  const requestBody = {
    "input": {
      "input_image": imageDataUrl,
      "prompt": prompt,
      "negative_prompt": "low quality, blurry, realistic photo, 3D render, normal face, thin face",
      "num_inference_steps": inferenceSteps,
      "guidance_scale": guidanceScale,
      "strength": strength
    }
  };

  const response = await fetch(
    "https://router.huggingface.co/replicate/v1/models/black-forest-labs/flux-kontext-dev/predictions",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody)
    }
  );
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Replicate API Error:', response.status, errorText);
    throw new Error(`Replicate API error: ${response.status} - ${errorText}`);
  }
  
  const result = await response.json();
  console.log('Replicate API Response:', result);
  
  // Replicate API response format handling
  if (result.urls && result.urls.stream) {
    // Use the stream URL for immediate access
    console.log('Using stream URL:', result.urls.stream);
    return result.urls.stream;
  } else if (result.status === 'starting' || result.status === 'processing') {
    // This is a prediction ID, we need to poll for completion
    const predictionId = result.id;
    const predictionUrl = `https://api.replicate.com/v1/predictions/${predictionId}`;
    
    // Poll for completion (max 30 attempts = 5 minutes)
    for (let i = 0; i < 1; i++) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
      
      const pollResponse = await fetch(predictionUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Accept': 'application/json',
        }
      });
      
      if (!pollResponse.ok) {
        console.error('Polling failed:', pollResponse.status);
        continue;
      }
      
      const pollResult = await pollResponse.json();
      console.log(`Poll attempt ${i + 1}:`, pollResult.status);
      
      if (pollResult.status === 'succeeded') {
        return Array.isArray(pollResult.output) ? pollResult.output[0] : pollResult.output;
      } else if (pollResult.status === 'failed') {
        throw new Error('Image generation failed');
      }
    }
    
    throw new Error('Image generation timed out');
  } else if (result.output) {
    // Direct response with output
    return Array.isArray(result.output) ? result.output[0] : result.output;
  } else if (result.urls && result.urls[0]) {
    // Some responses return URLs array
    return result.urls[0];
  } else if (typeof result === 'string') {
    return result;
  } else {
    console.error('Unexpected API response structure:', result);
    throw new Error('Unexpected response format from Replicate API');
  }
}



export async function POST(request: NextRequest): Promise<NextResponse<TransformResponse>> {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    const customPrompt = formData.get('prompt') as string || undefined;
    
    // Parse AI generation parameters with validation
    const inferenceSteps = Math.max(1, Math.min(100, parseInt(formData.get('inferenceSteps') as string || '30')));
    const guidanceScale = Math.max(1, Math.min(30, parseFloat(formData.get('guidanceScale') as string || '12')));
    const strength = Math.max(0.1, Math.min(1.0, parseFloat(formData.get('strength') as string || '0.9')));

    if (!imageFile) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Validate image
    const validation = await validateImage(imageFile);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Convert file to buffer for processing
    const imageBuffer = await imageFile.arrayBuffer();

    // Transform image using AI service
    const processedImageUrl = await transformImageWithAI(imageBuffer, customPrompt, inferenceSteps, guidanceScale, strength);

    return NextResponse.json({
      success: true,
      imageUrl: processedImageUrl,
    });

  } catch (error) {
    console.error('Image transformation error:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unexpected error occurred during image processing';

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: 'healthy',
    service: 'image-transform-api',
    timestamp: new Date().toISOString(),
  });
} 