import { Link } from "react-router-dom";
import { ImYoutube } from "react-icons/im";
import "./style/footer.scss";


export const Footer = () => {
    return(
        <footer>
            <hr/>
            <div className="footer-text">This is a school project that was made for the purpose of training and validating the final school project.<br/> 
            Any information provided here is a subject of confirmation. This website have no connection to From Software!</div>
            <div className="footer-text-social">Links to our social media</div>
            <div className="social-media">
                <Link className="footer-links" to={"https://www.youtube.com/channel/UCg2rjUSD7rFvOasuhikkAIw"}><ImYoutube /></Link>
            </div>
        </footer>
    );
};