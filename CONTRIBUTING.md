# Contributing to Universal File Opener

Thank you for your interest in contributing to Universal File Opener! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

Please be respectful and considerate in all interactions. We aim to foster an inclusive and welcoming community.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- A clear title and description
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Device/OS information

### Suggesting Features

Feature suggestions are welcome! Please open an issue with:
- A clear description of the feature
- Use cases and benefits
- Any implementation ideas (optional)

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Setup

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd universal-file-opener
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npx expo start
   ```

### Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused
- Use functional components with hooks

### File Structure

When adding new features:
- Components go in `src/components/`
- Screens go in `src/screens/`
- Utilities go in `src/utils/`
- Constants go in `src/constants/`

### Testing

Before submitting a PR:
- Test on both iOS and Android (if possible)
- Test with various file types
- Test edge cases (large files, corrupted files, etc.)
- Ensure no console warnings or errors

### Commit Messages

Use clear and descriptive commit messages:
- `feat: Add support for .zip files`
- `fix: Resolve crash when opening large PDFs`
- `docs: Update README with new features`
- `style: Format code according to style guide`
- `refactor: Simplify file type detection`

## Questions?

If you have questions, feel free to:
- Open an issue for discussion
- Contact the maintainers

Thank you for contributing! 🎉
