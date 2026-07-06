const renderGoogleAnalyticsScript = () => `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-8GPFPFW87C"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);} 
  gtag('js', new Date());

  gtag('config', 'G-8GPFPFW87C');
</script>`

export default {
    meta: {
        siteName: 'Intl',
        title: 'Intl by Before Semicolon',
        description:
            'HTML-first internationalization for Web Components with runtime scope, formatter APIs, and zero framework dependency.',
        image: '/assets/intl-banner.jpg',
    },
    site: {
        name: 'Intl',
        packageName: '@beforesemicolon/intl',
        repositoryUrl: 'https://github.com/beforesemicolon/intl',
        repositoryLabel: 'Intl GitHub repository',
        docsEditUrl: 'https://github.com/beforesemicolon/intl/tree/main/docs',
        footerDescription:
            'HTML-first internationalization for teams building in web components and component-first architectures.',
        footerGroups: [
            {
                title: 'Learning Resources',
                links: [{ label: 'Documentation', href: '/documentation' }],
            },
            {
                title: 'About Before Semicolon',
                links: [
                    {
                        label: 'Open Source',
                        href: 'https://github.com/beforesemicolon',
                    },
                    {
                        label: 'Website',
                        href: 'https://beforesemicolon.com/',
                    },
                    {
                        label: 'Blog',
                        href: 'https://medium.com/before-semicolon',
                    },
                    {
                        label: 'YouTube Channel',
                        href: 'https://www.youtube.com/channel/UCrU33aw1k9BqTIq2yKXrmBw',
                    },
                ],
            },
        ],
        socialLinks: [
            {
                name: 'Medium blog',
                href: 'https://medium.com/before-semicolon',
                icon: '/assets/medium2.svg',
            },
            {
                name: 'Facebook',
                href: 'https://www.facebook.com/beforesemicolon/',
                icon: '/assets/facebook.svg',
            },
            {
                name: 'Instagram',
                href: 'https://www.instagram.com/before_semicolon_/',
                icon: '/assets/instagram.svg',
            },
            {
                name: 'Reddit',
                href: 'https://www.reddit.com/r/beforesemicolon/',
                icon: '/assets/reddit.svg',
            },
            {
                name: 'Twitter',
                href: 'https://twitter.com/BeforeSemicolon',
                icon: '/assets/twitter.svg',
            },
            {
                name: 'YouTube',
                href: 'https://www.youtube.com/channel/UCrU33aw1k9BqTIq2yKXrmBw',
                icon: '/assets/youtube.svg',
            },
        ],
        copyright: `Copyright &copy; ${new Date().getFullYear()} Before Semicolon. All rights reserved.`,
    },
    headScripts: {
        analytics: renderGoogleAnalyticsScript,
    },
    theme: {
        light: {
            '--background': 'oklch(0.99 0.018 95)',
            '--foreground': 'oklch(0.2 0.025 95)',
            '--heading': 'var(--foreground)',
            '--card': 'oklch(1 0 0)',
            '--primary': 'oklch(0.62 0.14 80)',
            '--primary-glow': 'oklch(0.7 0.18 84)',
            '--primary-foreground': 'oklch(0.98 0.01 95)',
            '--secondary': 'oklch(0.94 0.025 95)',
            '--muted': 'oklch(0.95 0.02 95)',
            '--muted-foreground': 'oklch(0.4 0.04 95)',
            '--accent': 'oklch(0.68 0.14 75)',
            '--border': 'oklch(0.85 0.03 95)',
            '--ring': 'oklch(0.62 0.14 80)',
            '--surface': 'color-mix(in oklch, var(--card) 86%, transparent)',
            '--surface-muted':
                'color-mix(in oklch, var(--muted) 78%, transparent)',
            '--surface-hover':
                'color-mix(in oklch, var(--primary) 8%, var(--card))',
            '--surface-border':
                'color-mix(in oklch, var(--border) 78%, transparent)',
            '--header-bg':
                'color-mix(in oklch, var(--background) 74%, transparent)',
            '--footer-bg':
                'color-mix(in oklch, var(--background) 96%, var(--foreground) 4%)',
            '--grid-line':
                'color-mix(in oklch, var(--foreground) 6%, transparent)',
            '--gradient-hero':
                'radial-gradient(ellipse at top, oklch(0.86 0.18 84 / 0.3), transparent 60%)',
            '--gradient-primary':
                'linear-gradient(135deg, var(--primary), var(--primary-glow))',
            '--gradient-text':
                'linear-gradient(135deg, oklch(0.22 0.025 95), oklch(0.45 0.12 80))',
            '--gradient-border':
                'linear-gradient(135deg, oklch(0.62 0.14 80 / 0.45), oklch(0.58 0.12 90 / 0.25))',
            '--shadow-glow': '0 0 60px -15px oklch(0.62 0.14 80 / 0.35)',
            '--shadow-card':
                '0 1px 0 0 oklch(1 0 0 / 0.7) inset, 0 20px 40px -20px oklch(0.2 0.025 95 / 0.16)',
        },
        dark: {
            '--background': 'oklch(0.14 0.012 95)',
            '--foreground': 'oklch(0.96 0.012 95)',
            '--heading': 'var(--foreground)',
            '--card': 'oklch(0.2 0.02 95)',
            '--primary': 'oklch(0.75 0.16 82)',
            '--primary-glow': 'oklch(0.8 0.2 84)',
            '--primary-foreground': 'oklch(0.14 0.02 95)',
            '--secondary': 'oklch(0.26 0.025 95)',
            '--muted': 'oklch(0.22 0.02 95)',
            '--muted-foreground': 'oklch(0.72 0.03 95)',
            '--accent': 'oklch(0.75 0.15 78)',
            '--border': 'oklch(0.33 0.03 95)',
            '--ring': 'oklch(0.75 0.16 82)',
            '--surface': 'color-mix(in oklch, var(--card) 46%, transparent)',
            '--surface-muted':
                'color-mix(in oklch, var(--card) 62%, transparent)',
            '--surface-hover':
                'color-mix(in oklch, var(--primary) 9%, var(--card))',
            '--surface-border':
                'color-mix(in oklch, var(--border) 70%, transparent)',
            '--header-bg':
                'color-mix(in oklch, var(--background) 60%, transparent)',
            '--footer-bg':
                'color-mix(in oklch, var(--background) 88%, black 12%)',
            '--grid-line':
                'color-mix(in oklch, var(--foreground) 5%, transparent)',
            '--gradient-hero':
                'radial-gradient(ellipse at top, oklch(0.3 0.08 80 / 0.4), transparent 60%)',
            '--gradient-primary':
                'linear-gradient(135deg, var(--primary), var(--primary-glow))',
            '--gradient-text':
                'linear-gradient(135deg, oklch(0.98 0.008 95), oklch(0.85 0.1 84))',
            '--gradient-border':
                'linear-gradient(135deg, oklch(0.75 0.16 82 / 0.5), oklch(0.72 0.14 88 / 0.3))',
            '--shadow-glow': '0 0 60px -15px oklch(0.75 0.16 82 / 0.5)',
        },
    },
}
