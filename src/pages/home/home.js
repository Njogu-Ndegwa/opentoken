import style from './home.module.scss'
import home from '../../images/home.svg'
import logo from '../../images/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import laptop from '../../images/macbook.svg';
import iphone from '../../images/iphone.svg';
import google from '../../images/google.svg';
import twitter from '../../images/twitter.svg';
import instagram from '../../images/instagram.svg';
import linkedin from '../../images/linkedin.svg';
function Home() {
    return (
        <div className={style.main}>
            <div className={style.landingpage}>
                <div className={style.header}>
                    <div className={style.logo}>
                        <img src={logo} alt='logo icon'/>
                    </div>
                    <div className={style.rightside}>
                        <p>Home</p>
                        <p>Landings</p>
                        <p>Pages</p>
                        <p>Docs</p>
                        <p>Help</p>
                        <button className={style.loginbutton}>Login</button>
                    </div>
                </div>
                <div className={style.content}>
                    <div className={style.rightcontent}>
                        <div className={style.header}>
                            <h1>We help you to grow your business faster today</h1>
                        </div>
                        <div className={style.subheader}>
                            <p>Ehya is the Instagram analytics platform teams use to stay
                                focused on the goals, track engagement for report your business .</p>
                        </div>
                        <div className={style.button}>
                            <button className={style.whitebutton}>See how it works</button>
                            <button className={style.nobackground} >Get a free Demo <i class="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                    <div className={style.leftcontent}>
                        <img src={home} alt='home' />
                    </div>
                </div>
            </div>
            <div className={classNames(style.sectiontwo, style.first)}>
                <div className={style.leftsection}>
                    <div className={style.iphone}>
                        <img src={iphone} alt='phones' />
                    </div>
                </div>
                <div className={style.rightsection}>
                    <div className={style.content}>
                        <h4>Measure Impressions
                            and Reach Post</h4>
                        <p>Graphs displaying your performance for metrics
                            like follower evolution, average engagement rate per
                            post and reach and impressions to give you the insights.</p>
                    </div>
                </div>
            </div>
            <div className={classNames(style.sectiontwo, style.second)}>
                <div className={style.rightsection}>
                    <div className={style.content}>
                        <h4>Schedule Your Post Whenever You Want</h4>
                        <p>Publish your content automatically to ensure
                            that your content reaches the right people. Built-in features such as</p>
                        <ul>
                            <li><FontAwesomeIcon icon={faCircleCheck} /> <span> Best Time to Post</span></li>
                            <li><FontAwesomeIcon icon={faCircleCheck} /> <span> Geolocation</span> </li>
                            <li><FontAwesomeIcon icon={faCircleCheck} /> <span>  User Tag</span></li>
                            <li><FontAwesomeIcon icon={faCircleCheck} /> <span> Others benefit</span> </li>
                        </ul>
                    </div>
                </div>
                <div className={style.leftsection}>
                    <div className={style.laptop}><img src={laptop} alt='macbook laptop' /></div>
                </div>
            </div>
            <div className={style.sectionthree}>
                <div className={style.header}>
                    <h4>Track any hashtag(s) Performance</h4>
                    <p>Don't waste time on search manual tasks.
                        Let Automation do it for you.
                        Simplify workflows, reduce errors, and save time.</p>
                </div>
                <div className={style.content}>
                    <div className={style.card}>
                        <div className={classNames(style.icon, style.icon1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M22 12H18L15 21L9 3L6 12H2" stroke="#FEF2F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h6>Hashtag Growth</h6>
                        <p>Follow a hashtag growth
                            total posts, videos and images.</p>
                    </div>
                    <div className={style.card}>
                        <div className={classNames(style.icon, style.icon2)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M18 3C17.2044 3 16.4413 3.31607 15.8787 3.87868C15.3161 4.44129 15 5.20435 15 6V18C15 18.7956 15.3161 19.5587 15.8787 20.1213C16.4413 20.6839 17.2044 21 18 21C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 17.2044 20.6839 16.4413 20.1213 15.8787C19.5587 15.3161 18.7956 15 18 15H6C5.20435 15 4.44129 15.3161 3.87868 15.8787C3.31607 16.4413 3 17.2044 3 18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21C6.79565 21 7.55871 20.6839 8.12132 20.1213C8.68393 19.5587 9 18.7956 9 18V6C9 5.20435 8.68393 4.44129 8.12132 3.87868C7.55871 3.31607 6.79565 3 6 3C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6C3 6.79565 3.31607 7.55871 3.87868 8.12132C4.44129 8.68393 5.20435 9 6 9H18C18.7956 9 19.5587 8.68393 20.1213 8.12132C20.6839 7.55871 21 6.79565 21 6C21 5.20435 20.6839 4.44129 20.1213 3.87868C19.5587 3.31607 18.7956 3 18 3Z" stroke="#EFF6FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h6>Influencers by Hashtag</h6>
                        <p>Identify the most influential
                            people posting with your hashtag.</p>
                    </div>
                    <div className={style.card}>
                        <div className={classNames(style.icon, style.icon3)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="#FFFBEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M17 6H23V12" stroke="#FFFBEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h6>Most Influental Post</h6>
                        <p>See the most influential posts
                            on hashtag you are following on.</p>
                    </div>
                    <div className={style.card}>
                        <div className={classNames(style.icon, style.icon4)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M3 11L22 2L13 21L11 13L3 11Z" stroke="#F0FDFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h6>Hashtag Growth</h6>
                        <p>Visualize where people are
                            posting using your hashtag made.</p>
                    </div>
                </div>
            </div>
            <div className={style.footer}>
                <div className={style.footerContainer}>
                    <div className={classNames(style.sections, style.one)}>
                        <div className={style.logo}>
                        <img src={logo} alt='logo icon'/>
                        </div>
                        <p>Build a modern and creative website with crealand</p>
                        <div>
                            <span><img src={google} alt='google icon'/></span>
                            <span><img src={twitter} alt='twitter icon'/></span>
                            <span><img src={instagram} alt='instagram icon'/></span>
                            <span><img src={linkedin} alt='linkedin icon'/></span>
                        </div>
                    </div>
                    <div className={classNames(style.sections, style.two)}>
                    <p>Product</p>
                    <ul>
                        <li>Landingpage</li>
                        <li>Features</li>
                        <li>Documentation</li>
                        <li>Referral Program</li>
                        <li>Pricing</li>
                    </ul>
                    </div>
                    <div className={classNames(style.sections, style.three)}>
                    <p>Services</p>
                    <ul>
                        <li>Documentation</li>
                        <li>Design</li>
                        <li>Themes</li>
                        <li>Illustrations</li>
                        <li>UI Kit</li>
                    </ul>
                    </div>
                    <div className={classNames(style.sections, style.four)}>
                    <p>Company</p>
                    <ul>
                        <li>About</li>
                        <li>Terms</li>
                        <li>Privacy Policy</li>
                        <li>Careers</li>
                    </ul>
                    </div>
                    <div className={classNames(style.sections, style.five)}>
                    <p>More</p>
                    <ul>
                        <li>Documentation</li>
                        <li>Licence</li>
                        <li>Changelog</li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home