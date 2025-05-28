import styles from './HeroSection.module.css';

export default function HeroSection() {
    return (
        <div className='hero-section'>
            <h1 >Ansar Relief Foundation</h1>
            <span >
                Helping under-served communities and reducing labour child by funding small business
                to families and giving free education to children. 
                <br />
            </span>
            <div className='hero-section-button'>
                <button className='button1' type="button">
                    Learn More
                </button>
                <button className='Donate-button'>Donate Now!</button>
            </div>
        </div>
    );
}
