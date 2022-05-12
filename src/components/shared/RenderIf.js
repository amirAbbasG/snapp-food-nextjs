const RenderIf = ({isTrue, children}) => {
    return(
        isTrue && <>{children}</>
    )
}

export default RenderIf
