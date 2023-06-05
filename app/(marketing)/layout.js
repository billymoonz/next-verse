import { Nav } from '@/components/nav';

export default function MarketingLayout({ children }) {
    return (<div>
        <Nav />
        {children}
    </div>)
}