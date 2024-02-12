import { Link } from 'react-router-dom'
import { useActions } from '@/hooks/useActions'

const CustomLink = ({ to, children }: { to: string; children?: any }) => {
    const { fileListEmptied } = useActions()
    return (
        <Link
            to={to}
            onClick={() => {
                fileListEmptied()
            }}
        >
            {children}
        </Link>
    )
}

export default CustomLink
