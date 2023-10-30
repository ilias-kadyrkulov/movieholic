import { Link } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'

const CustomLink = ({ to, children }: { to: string; children: any }) => {
    const { playerDisabled } = useActions()
    return (
        <Link
            to={to}
            onClick={() => {
                playerDisabled()
            }}
        >
            {children}
        </Link>
    )
}

export default CustomLink
