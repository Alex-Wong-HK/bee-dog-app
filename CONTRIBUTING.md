# Contributing to Bee Dog Website

Thank you for your interest in contributing to the Bee Dog Website! This project aims to raise awareness about animal welfare and provide an educational platform for animal protection advocacy.

## 🌟 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Git
- A text editor or IDE

### Setting Up Your Development Environment

1. **Fork the repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/bee-dog-website.git
   cd bee-dog-website
   ```

3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/bee-dog-website.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Set up environment variables**:
   ```bash
   cp env.local.template .env.local
   ```
   Edit `.env.local` and add your API keys (see README.md for details)

6. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🎯 How to Contribute

### Types of Contributions We Welcome

- **Bug fixes** - Help us improve the platform
- **Feature enhancements** - Add new educational tools or improve existing ones
- **Documentation** - Improve README, comments, or add guides
- **Translations** - Add support for new languages/regions
- **Accessibility improvements** - Make the platform more inclusive
- **Performance optimizations** - Help the platform load faster
- **Animal welfare content** - Add educational resources or improve existing content

### Content Guidelines

When contributing content:

1. **Respect and dignity**: Never exploit animal suffering for engagement
2. **Educational value**: Ensure content teaches about animal welfare
3. **Cultural sensitivity**: Research local contexts for animal protection
4. **Factual accuracy**: Verify all claims about animal welfare and laws
5. **Actionable information**: Provide ways readers can help animals

## 🔄 Development Workflow

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `i18n/locale` - Translation updates
- `refactor/description` - Code refactoring

### Making Changes

1. **Create a new branch** from `main`:
   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards
3. **Test your changes**:
   ```bash
   npm run build
   npm run lint
   npm run type-check
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add description of your changes"
   ```

### Commit Message Convention

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code formatting changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `i18n:` - Internationalization updates

Examples:
- `feat: add Korean language support for animal welfare content`
- `fix: resolve image upload validation issue`
- `docs: update API documentation for transform endpoint`

### Submitting a Pull Request

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub:
   - Use a clear, descriptive title
   - Fill out the PR template completely
   - Link any related issues
   - Add screenshots for UI changes
   - Ensure all checks pass

3. **Respond to feedback** from reviewers
4. **Rebase if needed** to keep history clean

## 🌐 Internationalization (i18n)

### Adding a New Language

To add support for a new language/region:

1. **Research local context**:
   - Local animal welfare laws and concerns
   - Cultural sensitivity around animal protection
   - Appropriate terminology and expressions

2. **Create translation files**:
   ```
   locales/[locale-code]/common.json
   ```

3. **Update configuration**:
   - Add locale to `middleware.ts`
   - Update i18n configuration

4. **Test thoroughly** with native speakers familiar with local animal welfare issues

### Translation Guidelines

- **Don't just translate** - adapt content for local animal protection concerns
- **Research local laws** and animal welfare organizations
- **Use appropriate terminology** for the region
- **Maintain the educational and respectful tone**

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR, please test:

- [ ] All pages load correctly in development
- [ ] Language switching works properly
- [ ] Image upload functionality works (if applicable)
- [ ] Mobile responsiveness
- [ ] Accessibility (keyboard navigation, screen readers)
- [ ] Error handling

### Code Quality

- **ESLint**: `npm run lint`
- **TypeScript**: `npm run type-check`
- **Prettier**: Code should be formatted consistently
- **Accessibility**: Use semantic HTML and ARIA labels

## 🚀 Performance Guidelines

- **Optimize images** - Use WebP format where possible
- **Minimize bundle size** - Avoid unnecessary dependencies
- **Use Next.js features** - Leverage Image optimization, dynamic imports
- **Accessibility first** - Ensure fast loading for all users

## 📝 Documentation

### Code Documentation

- **Comment complex logic** - Especially around AI processing
- **Document API endpoints** - Include request/response examples
- **Update README** - If you add new features or change setup
- **Type definitions** - Use TypeScript effectively

### Content Documentation

- **Source animal welfare information** - Cite reputable organizations
- **Explain cultural adaptations** - Document why content was adapted for specific regions
- **Update setup guides** - Keep installation and configuration current

## 🛡️ Security

### Reporting Security Issues

Please report security vulnerabilities to [your-security-email] instead of creating public issues.

### Security Guidelines

- **Never commit API keys** or secrets
- **Use environment variables** for all configuration
- **Validate all user inputs** especially file uploads
- **Sanitize content** to prevent XSS
- **Follow security best practices** for Next.js applications

## 🤝 Community

### Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

### Getting Help

- **GitHub Issues** - For bug reports and feature requests
- **GitHub Discussions** - For questions and community discussion
- **Documentation** - Check README.md and existing docs first

### Communication

- Be respectful and inclusive
- Focus on animal welfare and education
- Provide constructive feedback
- Help other contributors learn and grow

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special recognition for animal welfare content improvements

## 📋 Issue and PR Templates

When creating issues or PRs, please use the provided templates and fill them out completely. This helps us understand and address your contribution more efficiently.

Thank you for contributing to animal welfare advocacy! Every contribution helps create a more compassionate world for all animals. 🐕❤️ 