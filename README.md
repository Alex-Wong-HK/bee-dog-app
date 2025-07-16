# 🐕💔 Animal Protection Advocacy - The Real Story Behind Bee Dog

A modern, internationalized advocacy platform built with Next.js 14+ and TypeScript, dedicated to animal welfare awareness and protection across English, Simplified Chinese, and Korean communities.

## 🎯 Our Mission

This platform transforms what appeared to be a viral meme into a powerful tool for animal welfare advocacy. The "bee dog" image that circulated widely wasn't actually a humorous moment - it was evidence of animal abuse. The dog's swollen face wasn't from bee stings, but from rope injuries around its neck that became severely infected. We use this platform to educate communities about animal protection, abuse prevention, and the importance of treating all creatures with compassion.

## 🌟 Features

- **🌍 International Advocacy**: Full i18n support for English, Chinese (Simplified), and Korean animal welfare content
- **⚡ Modern Platform**: Built with Next.js 14+ App Router, TypeScript, and Tailwind CSS
- **🧭 Navigation System**: Responsive navigation bar with language switching and mobile-friendly hamburger menu
- **🎮 Educational Gaming**: Interactive "Save the Dog" game promoting animal welfare awareness through engaging gameplay
- **🤖 Image AI Tool**: Educational tool demonstrating visual effects of animal abuse for awareness and advocacy purposes
- **🎨 Respectful Design**: Professional, compassionate styling appropriate for advocacy work
- **📱 Accessible**: Mobile-first design ensuring advocacy reaches all devices
- **🔗 Community Building**: Links to animal welfare advocacy communities on Telegram and X
- **📋 Resource Sharing**: Easy sharing of educational content and support resources
- **🚀 Performance**: Optimized for fast loading to maximize advocacy reach
- **♿ Inclusive**: ARIA labels, alt text, and accessibility features for all users
- **🔍 SEO Optimized**: Structured for maximum visibility of animal welfare content

## 🐕 The Real Story

### What We Thought We Knew
The viral image showed a dog with a dramatically swollen face, widely shared as a humorous "bee sting" meme across social media platforms and internet communities.

### The Heartbreaking Truth
Investigation revealed the dog's condition wasn't caused by bee stings but by rope tied around its neck that caused severe injuries and infection. What millions saw as entertainment was actually documentation of animal abuse and suffering.

### Our Response
We transformed this platform from entertainment to education, using the viral nature of the original content to:
- Raise awareness about animal abuse
- Educate communities on recognizing signs of mistreatment
- Promote responsible pet ownership
- Advocate for stronger animal protection laws
- Support animal welfare organizations

## 🎮 Interactive Educational Features

### Save the Dog Game
An engaging puzzle game that promotes animal welfare awareness through gameplay:
- Educational scenarios teaching animal protection principles
- Embedded GameFlare gaming platform with appropriate security measures
- Multi-language support for global advocacy reach
- Accessible controls and inclusive design

### Image AI Educational Tool
A responsible educational tool for understanding the visual effects of animal abuse:
- **Educational Purpose Only**: Designed solely for awareness and advocacy
- **Controlled Environment**: Safe processing with file validation and security measures
- **Cultural Sensitivity**: Appropriate warnings and context for all content
- **API Integration**: Configurable AI service integration (Replicate, Hugging Face, OpenAI)

⚠️ **Important**: The Image AI tool is designed exclusively for educational and advocacy purposes to raise awareness about animal cruelty. It should never be used for entertainment or inappropriate content creation.

### Navigation Features
- **Responsive Design**: Seamless experience across desktop and mobile devices
- **Language Switching**: Preserve current page context when switching between English, Chinese, and Korean
- **Accessibility First**: Keyboard navigation, ARIA labels, and focus management
- **Progressive Enhancement**: Works with and without JavaScript

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bee-dog-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Add the advocacy image:
   - Place the `bee-dog.jpg` image in the `public/` directory
   - The build process will automatically generate the WebP version
   - Image is presented respectfully with appropriate context

4. Update blockchain integration:
   - Edit `app/[locale]/page.tsx`
   - Contract address supports animal welfare initiatives

5. Configure Image AI service (required for Image AI features):
```bash
# Copy the environment template
cp .env.local.example .env.local
```

Edit `.env.local` and add your chosen AI service API key:
```bash
# Choose ONE of the following services:

# Option 1: Replicate (Recommended)
REPLICATE_API_TOKEN=your_replicate_api_token_here

# Option 2: Hugging Face
HUGGINGFACE_API_KEY=your_huggingface_api_key_here

# Option 3: OpenAI
OPENAI_API_KEY=your_openai_api_key_here
```

**Getting API Keys:**
- **Replicate**: Visit [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens)
- **Hugging Face**: Visit [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)  
- **OpenAI**: Visit [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)

6. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌐 International Animal Welfare

This platform provides culturally-sensitive animal welfare advocacy across three languages:

- **English (`en`)**: Focuses on animal protection laws and abuse prevention
- **Simplified Chinese (`zh-CN`)**: Adapted for Chinese animal welfare concerns and cultural context
- **Korean (`ko-KR`)**: Addresses Korean animal protection issues and community values

### URL Structure

**Main Pages:**
- Homepage: `/en`, `/zh-CN`, `/ko-KR`
- Game: `/en/game`, `/zh-CN/game`, `/ko-KR/game`
- Image AI: `/en/image-ai`, `/zh-CN/image-ai`, `/ko-KR/image-ai`

**API Endpoints:**
- Image transformation: `/api/transform-image`
- Health check: `/api/transform-image` (GET)

### Adding New Advocacy Regions

1. Add the locale code to `middleware.ts`:
```typescript
locales: ['en', 'zh-CN', 'ko-KR', 'new-locale']
```

2. Create culturally-appropriate translation files:
```
locales/new-locale/common.json
```

3. Research local animal welfare laws and concerns for that region
4. Adapt content for cultural sensitivity around animal protection

## 🎨 Design Philosophy

### Color Palette

The platform uses a respectful, professional color scheme defined in `tailwind.config.js`:
- **Green colors**: Representing growth, healing, and compassion
- **Blue colors**: Conveying trust, stability, and protection
- **Purple accents**: Adding warmth and empathy
- **Subdued tones**: Maintaining seriousness while remaining approachable

### Content Approach

All content follows principles of:
- **Respectful presentation**: Never exploiting animal suffering for engagement
- **Educational focus**: Providing actionable information about animal welfare
- **Cultural sensitivity**: Adapting messages for different cultural contexts
- **Hope and action**: Balancing awareness of problems with solutions and hope

## 🏗️ Project Structure

```
bee-dog-website/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx      # Root layout with animal welfare metadata
│   │   └── page.tsx        # Main advocacy landing page
│   └── globals.css         # Global styles optimized for accessibility
├── components/
│   ├── CopyButton.tsx      # Resource sharing functionality
│   ├── SocialLinks.tsx     # Advocacy community links
│   └── MissionSection.tsx  # Animal welfare mission component
├── locales/
│   ├── en/common.json      # English advocacy content
│   ├── zh-CN/common.json   # Chinese advocacy content
│   └── ko-KR/common.json   # Korean advocacy content
├── public/
│   ├── bee-dog.jpg         # Advocacy image (presented respectfully)
│   └── bee-dog.webp        # Optimized version
├── middleware.ts           # Next.js i18n middleware
├── next.config.mjs         # Next.js configuration
├── tailwind.config.js      # Compassionate design system
└── tsconfig.json           # TypeScript configuration
```

## 🔧 Troubleshooting

### GameFlare Iframe Issues

If the game doesn't load properly:

1. **Check Content Security Policy**: Ensure CSP headers allow GameFlare domain
2. **Browser Security**: Some browsers block iframes by default
3. **Network Issues**: Verify GameFlare service availability
4. **Console Errors**: Check browser console for iframe-related errors

```bash
# Verify CSP configuration in next.config.mjs
headers: [
  {
    key: 'Content-Security-Policy',
    value: "frame-src 'self' https://www.gameflare.com; frame-ancestors 'self';"
  }
]
```

### Image AI Processing Issues

Common problems and solutions:

1. **API Key Not Configured**:
   ```bash
   Error: AI service API key not configured
   ```
   Solution: Add your AI service API key to `.env.local`

2. **File Upload Errors**:
   - Check file size (max 10MB)
   - Verify file type (JPEG, PNG, WebP only)
   - Ensure proper file validation

3. **Rate Limiting**:
   ```bash
   Error: Rate limit exceeded
   ```
   Solution: Wait 1 minute between requests (5 requests per minute limit)

4. **Processing Timeouts**:
   - Large images may take longer to process
   - Check AI service status and quotas
   - Verify network connectivity

### Language Switching Problems

If language switching doesn't work:

1. **Route Resolution**: Check middleware configuration in `middleware.ts`
2. **Translation Missing**: Verify all required keys exist in locale files
3. **Browser Cache**: Clear browser cache and reload
4. **Pathname Issues**: Ensure URL structure matches locale patterns

### Development Server Issues

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Type check
npm run type-check

# Lint check
npm run lint
```

## 📱 Components

### MissionSection
Dedicated animal welfare advocacy component featuring:
- Educational content about abuse prevention
- Resources for animal care and protection
- Calls to action for advocacy engagement
- Culturally-adapted messaging

### CopyButton
Resource sharing component with:
- Easy sharing of advocacy materials
- Support for blockchain-based welfare initiatives
- Accessibility features for all users

### SocialLinks  
Community building component featuring:
- Links to animal welfare advocacy groups
- Telegram and X community integration
- Focus on education and support rather than entertainment

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Vercel will automatically detect Next.js configuration
3. Set any necessary environment variables
4. Deploy your advocacy platform!

The platform is optimized for fast loading to maximize reach of animal welfare content.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production advocacy platform
- `npm run start` - Start production server  
- `npm run lint` - Run ESLint for code quality
- `npm run type-check` - Run TypeScript compiler check

## 🌐 Community Advocacy Links

- **Telegram**: https://t.me/+wCDAvuu9tAUwZDc1 - Animal welfare advocacy community
- **X Community**: https://x.com/i/communities/1943917664927109411 - Animal protection discussions

## 🤝 Contributing

We welcome contributions that advance animal welfare advocacy:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/welfare-improvement`)
3. Commit your changes (`git commit -m 'Add animal welfare feature'`)
4. Push to the branch (`git push origin feature/welfare-improvement`)
5. Open a Pull Request

### Content Guidelines

When contributing content:

1. **Respect and dignity**: Never exploit animal suffering for engagement
2. **Educational value**: Ensure content teaches about animal welfare
3. **Cultural sensitivity**: Research local contexts for animal protection
4. **Factual accuracy**: Verify all claims about animal welfare and laws
5. **Actionable information**: Provide ways readers can help animals

### Adding New Languages

To add support for a new language/region:

1. Research local animal welfare laws and cultural contexts
2. Create culturally-appropriate translation files in `locales/[locale]/common.json`
3. Adapt content for local animal protection concerns (don't just translate)
4. Update middleware and i18n configuration
5. Test thoroughly with native speakers familiar with local animal welfare issues

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Animal welfare organizations worldwide for their tireless work
- Communities that support animal protection and abuse prevention
- Technology platforms that enable advocacy and education
- Everyone working to create a more compassionate world for all animals

---

**Made with ❤️ for all innocent lives.**

*Transforming awareness into action for animal welfare - every voice matters.* 