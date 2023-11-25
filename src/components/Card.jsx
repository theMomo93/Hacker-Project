export default function Card({title, image, text}){
    const defaultTitle = "Some Title Here";
    const defaultPara = "Lorem Impsum bla bla Vitze alle puff puff";
    
    function image() {
        const randomImageNumber = Math.floor(Math.random() * 40) + 1;
        return `https://picsum.photos/200/300?random=${randomImageNumber}`;
      }
    
      const defaultImage = image();
    


    return(
        <div className="card">
        <h2>{title}</h2>   
        <img src={defaultImage} alt="Card" />
        <p>{text}</p>
      </div>
    );
};