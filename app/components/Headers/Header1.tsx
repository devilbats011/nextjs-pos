
export default function Header1({children, style,...props}: {children?: React.ReactNode, style?: React.CSSProperties}) {
    return (
        <h1 {...props} style={{...style}} className="text-2xl font-bold text-center">{children}</h1>
    )
}
