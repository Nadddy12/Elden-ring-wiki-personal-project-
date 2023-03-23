import { Link } from "react-router-dom";

export const Footer = () => {
    return(
        <footer>
            <div className="footer-text">This is a school project that was made for the purpose of training and validating the final school project.<br/> 
            Any information provided here is a subject of confirmation. This website have no connection to From Software!</div>
            <div className="social-media">
                <Link className="footer-links" to={"https://www.youtube.com/channel/UCg2rjUSD7rFvOasuhikkAIw"}>Youtube</Link>
            </div>
        </footer>
    );
};