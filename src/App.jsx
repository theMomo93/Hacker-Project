import './App.css';
import Greeting from './components/Greeting'; {/* Important*/}
import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Card';
import Navigation from './components/Navigation';

function App() {
  return (
  <>
  <Navigation home = "home" about ="about" menu = "menu" />
  <Header />
  <Greeting />      {/* Important*/}
  <div className='cardContainer'>
  <Card title ="Image 1" text="Lorem Ipsuum  something "/>
  <Card title ="Image 2" text="Lorem Ipsuum  something "/>
  <Card title ="Image 3" text="Lorem Ipsuum  something "/>
  <Card title ="Image 4" text="Lorem Ipsuum  something "/>
  <Card title ="Image 5" text="Lorem Ipsuum  something "/>
  <Card title ="Image random" text="Lorem Ipsuum  something "/>
  <Card title ="Image something" text="Lorem Ipsuum  something "/>
  <Card title ="Image tree?"text="Lorem Ipsuum  something "/>
  <Card title ="Image animal?" text="Lorem Ipsuum  something "/>
  <Card title ="Image city?" text="Lorem Ipsuum  something "/>
  <Card title ="Image 12" text="Lorem Ipsuum  something "/>
  <Card title ="Image 13" text="Lorem Ipsuum  something "/>
  </div>
  <Footer />
  </>);
}

export default App
