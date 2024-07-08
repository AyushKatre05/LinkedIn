import { Home, Users, MessageSquare, Bell } from 'lucide-react'

export const headerNavLink = [
    {
        label: 'Home',
        icon: Home,
        route: '/'
    },
    {
        label: 'My Network',
        icon: Users,
        route: '/find-friends'
    },
    {
        label: 'Messaging',
        icon: MessageSquare,
        route: '/message'
    },
    {
        label: 'Notifications',
        icon: Bell,
        route: '/notification'
    }
]
