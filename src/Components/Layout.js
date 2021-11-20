import { Container } from 'react-bootstrap'
import Header from './Header/Header'
import Footer from './Footer/Footer';

export default function Layout(props) {
    return (
        <div className="h-100">
            <Header/>
            <Container className="h-100 p-0" fluid={true}>
                {props.children}
            </Container>
            <Footer/>
        </div>  
    );
}
