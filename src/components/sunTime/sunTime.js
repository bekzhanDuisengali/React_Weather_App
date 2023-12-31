import { Component } from "react";
import WeatherService from "../../services/WeatherService";
import './sunTime.scss';
class SunTime extends Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.timerId = null;
        this.state = {
            sunset: null,
            sunrise: null
        }
    }
    componentDidMount(){
        this._isMounted = true;
        this.updateSunTime(this.props.city);
    }
    componentDidUpdate(prevProps){
        if(prevProps!==this.props.city){
            this.updateSunTime(this.props.city)
        }
    }
    componentWillUnmount(){
        clearTimeout(this.timerId)
    }
    weatherService = new WeatherService();
    updateSunTime = () =>{
        const city = this.props.city;
        this.weatherService
            .getCityResourse(city)
            .then(({sys})=>{
            if(this._isMounted){
                this.setState({
                    sunrise: sys.sunrise * 1000,
                    sunset: sys.sunset * 1000,
                })
            }
        }).catch(error=>{
            console.error('Error fetching weather data: ', error);

        })
    }
    formatTime = (timeZone) =>{
        return timeZone < 10 ? `0${timeZone}` : timeZone;
    }
    render(){
        const {sunrise,sunset} = this.state;
        const rise = new Date(sunrise);
        const riseHours = this.formatTime(rise.getHours())
        const riseMinutes =this.formatTime(rise.getMinutes())
        const set = new Date(sunset);
        const setHours = this.formatTime(set.getHours());
        const setMinutes = this.formatTime(set.getMinutes());
        return(
            <>
            
            <div className="suntime">
                <div className="suntime__card">
                    <p>{'Time of sunrise: '} <b>{riseHours}{':'}{riseMinutes}</b> </p>
                    <svg width="800px" height="800px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <circle id="earthsun-a" cx="26.811" cy="27" r="26.5"/>
                    </defs>
                    <g fill="none" fill-rule="evenodd">
                        <g transform="translate(7 3)">
                        <mask id="earthsun-b" fill="#ffffff">
                            <use href="#earthsun-a"/>
                        </mask>
                        <use fill="#80D25B" href="#earthsun-a"/>
                        <path fill="#22BA8E" d="M42.4768987 20.0051965C42.4768987 20.0051965 36.6488785 17.6267342 34.9129423 18.8159654 33.1770061 20.0051965 34.1043701 25.6205727 34.1043701 25.6205727 34.1043701 25.6205727 31.5172017 29.3284459 32.8107859 31.278609 34.1043701 33.228772 37.6976596 32.5584107 39.7164648 34.2785955 41.73527 35.9987803 40.8965076 39.0860558 40.8965076 39.0860558L40.408214 42.6905025C40.408214 42.6905025 45.8155404 40.2674113 47.373617 36.7765059 48.9316935 33.2856006 48.4269923 27.8126434 48.4269923 27.8126434L51.5831802 24.951138 54.3586241 15.9505118 44.6190899 12.8006946 43.5460254 8 36.5812787 9.9741762 35.9518788 15.210206 41.3012498 16.9813469 42.4768987 20.0051965zM-1 23.0403062C-1 23.0403062.969941238 21.784322 1.2328707 21.7643353 3.25003481 21.611 10.2791656 22.0398197 12.1170184 19.3753768 14.1944281 16.3636342 15.9261253 12.3755591 15.9261253 12.3755591L15.856544 9.30708574 4.99433636 6.6413691-1 23.0403062zM16.0762462 48.1005004L16.9965049 37.937221 9.60330138 32.2773871C9.60330138 32.2773871 9.1763272 27.7480643 14.5426164 27.1080074 19.9089055 26.4679505 23.2151251 29.7871087 23.2151251 29.7871087 23.2151251 29.7871087 25.3455484 33.0839663 24.5510368 35.3236214 23.7565252 37.5632766 21.7009032 40.917145 21.7009032 40.917145 21.7009032 40.917145 21.5378451 44.7273251 20.1446309 46.5066252 18.7514166 48.2859253 16.0762462 48.1005004 16.0762462 48.1005004z" mask="url(#earthsun-b)"/>
                        </g>
                        <circle cx="51" cy="46" r="14" fill="#FFF"/>
                        <circle cx="51" cy="46" r="7" fill="#FFAF40"/>
                        <path stroke="#FFAF40" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M51,37 L51,35 M57.363961,39.636039 L58.7781746,38.2218254 M60,46 L62,46 M57.363961,52.363961 L58.7781746,53.7781746 M51,55 L51,57 M44.636039,52.363961 L43.2218254,53.7781746 M42,46 L40,46 M44.636039,39.636039 L43.2218254,38.2218254"/>
                    </g>
                    </svg>

                    <p>{'Time of sunset: '} <b>{setHours}{':'}{setMinutes}</b> </p>
                    
                </div>
                
            </div>
            </>
        )
    }
}
export default SunTime; 