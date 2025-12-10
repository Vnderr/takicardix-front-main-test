function Image({ src, alt, className }) {
    return <img src={src} alt={alt} className={`mx-auto mt-2 ${className || ""}`} />;
}


export default Image;