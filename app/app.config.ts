export default defineAppConfig({
  global: {
    picture: {
      dark: 'https://avatars.githubusercontent.com/u/31939497?s=96&v=4',
      light: 'https://avatars.githubusercontent.com/u/31939497?s=96&v=4',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/',
    email: 'ui-pro@nuxt.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Built with Nuxt UI • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-discord',
      'to': 'https://discord.com/users/simdav22',
      'target': '_blank',
      'aria-label': 'Discord: simdav22'
    }, {
      'icon': 'i-simple-icons-x',
      'to': 'https://x.com/DavidSimonBoli1',
      'target': '_blank',
      'aria-label': 'David on X'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/SIMDAV20',
      'target': '_blank',
      'aria-label': 'David on GitHub'
    }]
  }
})
