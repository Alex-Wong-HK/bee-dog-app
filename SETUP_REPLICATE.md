# 🐝 Free Image AI Setup Guide

## 🆓 FREE Options Available!

### Option 1: **Hugging Face API** (Recommended - FREE!)
- ✅ **30,000 requests/month** completely free
- ✅ No credit card required for basic tier
- ✅ Easy setup

### Option 2: **Demo Mode** (No API needed)
- ✅ Works immediately, no setup required
- ✅ Basic CSS filter effects
- ⚠️ Not true AI transformation

### Option 3: **Replicate API** (Paid)
- 💰 ~$0.01-0.05 per image
- ⭐ Highest quality results

---

## 🚀 Setup Instructions

### FREE Option 1: Hugging Face API

1. Go to [HuggingFace.co](https://huggingface.co/)
2. Sign up for a free account
3. Visit [Settings → Access Tokens](https://huggingface.co/settings/tokens)
4. Click "New token" → "Read" access
5. Copy your token (starts with `hf_`)

Create `.env.local` file:
```bash
# FREE Hugging Face API (30k requests/month)
HUGGINGFACE_API_KEY=hf_your_token_here
```

### FREE Option 2: Demo Mode
No setup required! Just upload an image and it will work automatically with CSS effects.

### Paid Option: Replicate API

### 1. Get Your Replicate API Token

1. Go to [Replicate.com](https://replicate.com/)
2. Sign up for a free account
3. Visit [API Tokens page](https://replicate.com/account/api-tokens)
4. Click "Create token"
5. Copy your API token (starts with `r8_`)

### 2. Create Environment File

Create a `.env.local` file in your project root with:

```bash
# === CHOOSE ONE OR BOTH ===

# FREE Option: Hugging Face API (30k requests/month)
HUGGINGFACE_API_KEY=hf_your_huggingface_token_here

# Paid Option: Replicate API (~$0.01-0.05 per image)
# REPLICATE_API_TOKEN=r8_your_replicate_token_here

# Optional: Additional Configuration
MAX_FILE_SIZE_MB=10
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=5
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Priority Order:**
1. 🆓 Hugging Face API (if configured)
2. 💰 Replicate API (if configured)
3. 🎭 Demo Mode (always works as fallback)

### 3. Restart Development Server

```bash
npm run dev
```

## 🤖 AI Prompt Details

**Function**: Transform faces to show bee sting swelling effects  
**Chinese Description**: 把他的face變成給蜜蜂叮腫了一樣  
**English Description**: Make their face look swollen from bee stings  

**Full AI Prompt**:
```
Transform this person's face to show realistic swelling effects as if stung by multiple bees. Add significant facial puffiness and swelling, especially around the eyes, cheeks, lips, and forehead. The swelling should look natural but dramatic, similar to a severe allergic reaction to multiple bee stings. Make the face noticeably puffy and swollen while keeping the person recognizable. The transformation should be obvious and concerning, showing the serious effects of bee stings. This is for educational purposes about animal cruelty awareness. Make it look like the viral "bee dog" meme but on a human face.
```

## ⚙️ Technical Details

- **AI Model**: Stable Diffusion XL (img2img)
- **Model Version**: `db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf`
- **Processing Time**: 1-3 minutes
- **Strength**: 0.7 (70% transformation)
- **Steps**: 30 inference steps
- **Guidance Scale**: 8.0

## 💰 Pricing

- **Free Tier**: Limited predictions per month
- **Pay-per-use**: ~$0.01-0.05 per image transformation
- **Credits**: Check your [Replicate billing](https://replicate.com/account/billing)

## 🔧 Troubleshooting

### Common Errors:

1. **"Replicate API key not configured"**
   - Check your `.env.local` file exists
   - Verify the token starts with `r8_`
   - Restart your dev server

2. **"Invalid Replicate API token"**
   - Double-check your token from Replicate dashboard
   - Make sure there are no extra spaces

3. **"API credits exhausted"**
   - Check your Replicate billing page
   - Add payment method if needed

4. **"Processing timed out"**
   - Try a smaller image (< 5MB)
   - Check Replicate service status

## 🎯 Expected Results

The AI will transform uploaded face images to show:
- ✅ Realistic facial swelling
- ✅ Puffy eyes, cheeks, and lips
- ✅ Bee sting-like allergic reaction effects
- ✅ Educational awareness about animal cruelty
- ✅ Maintains person's recognizable features

## 🛡️ Safety & Ethics

This tool is designed for:
- ✅ Educational purposes about animal welfare
- ✅ Awareness campaigns against animal cruelty
- ✅ Understanding the effects of animal abuse

**NOT for**:
- ❌ Entertainment or mocking
- ❌ Harmful content creation
- ❌ Bullying or harassment

---

**Need Help?** Check the [Replicate Documentation](https://replicate.com/docs) or contact support. 