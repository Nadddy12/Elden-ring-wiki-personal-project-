import {Header} from "../../components/layout/Header.js";
import { Footer } from "../../components/layout/Footer.js";
import { Link } from "react-router-dom";
import "./home.scss";

import character_bw from "../../assets/photo/character_bw.png";

export const Home = () => {
    
    return(
        <>
            <Header />
            <main>
                <section>
                    <h2>Elden Ring by From Software.</h2>
                    <article> Elden Ring is one of the most highly anticipated video games of recent     years, and for good reason. Developed by FromSoftware, the studio behind the     critically acclaimed Dark Souls series, and George R.R. Martin, the author of the     popular A Song of Ice and Fire book series, Elden Ring is an upcoming action role    -playing game that promises to offer a unique and immersive gaming experience.
    
                        Set in a fantasy world called The Lands Between, Elden Ring combines the challenging     gameplay and deep lore that fans of FromSoftware have come to expect, with the     narrative expertise and world-building skills of George R.R. Martin. The game     features a vast open world to explore, with a variety of environments ranging from     lush forests to dark dungeons, and promises to offer players a sense of freedom     and adventure unlike anything they've experienced before.
    
                        Elden Ring's combat system is also expected to be a major highlight of the game.     Players will be able to choose from a wide range of weapons and magical abilities,     and will have to master different strategies to defeat the various enemies and     bosses they encounter. With a focus on player choice and customization, Elden Ring     promises to offer a unique and deeply rewarding gameplay experience.
    
                        Overall, Elden Ring is shaping up to be one of the most ambitious and exciting games     of the year, and fans of FromSoftware, George R.R. Martin, and action role-playing     games in general won't want to miss it. </article>
                </section>
                <section>
                    <h2>To Know About Elden ring</h2>
                    <div className="container">
                        <div>
                            <h3>Release Date</h3>
                            <article>Elden Ring was originally scheduled for release in January 2022 but was later delayed to February 25, 2022. However, the game's release date was delayed yet again, and the developers have not yet announced a new release date.</article>
                        </div>
                        <div>
                            <h3>Gameplay</h3>
                            <article>The gameplay footage released by FromSoftware in 2021 showcased some of the game's mechanics, including mounted combat, stealth, and magic. The game's combat system is expected to be challenging, with players having to master different strategies to defeat enemies and bosses. The game's open-world design is also expected to offer players a sense of freedom and adventure, with a variety of environments to explore.</article>
                        </div>
                        <div>
                            <h3>Story</h3>
                            <article>The plot of Elden Ring is shrouded in mystery, but fans have speculated that it will follow the story of a character known as the Tarnished, who is on a quest to restore the Elden Ring and save the world from destruction. FromSoftware has stated that the game's story will be told through environmental storytelling, and players will have to piece together the narrative through exploration and interactions with characters.</article>
                        </div>
                        <div>
                            <h3>Multiplayer</h3>
                            <article>Elden Ring will feature both single-player and multiplayer modes, with up to four players being able to team up to explore the game's world and tackle bosses together. The game's multiplayer mode is expected to offer a unique and rewarding experience for players. In conclusion, while there is still no official release date for Elden Ring, fans can expect a challenging and immersive action role-playing game with a unique story, open-world design, and multiplayer mode. Keep an eye out for any new information on this highly anticipated game..</article>
                        </div>
                    </div>
                </section>
                <section>
                    <h2>Tools</h2>
                    <div className="container">
                    <article>Try Our Powerful builder and create your own unique style of play ! <span>Hover over the photo and click on it to access to the Tool.</span></article>
                        <div className="animation-wrapper">
                            <Link to={"/builder"}><div className="color-image"></div></Link>
                            <img src={character_bw} alt="character"/>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};