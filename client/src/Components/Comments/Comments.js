import './Comments.scss';
function Comments(){
return (
   <section className="reviews">
       <div className ="reviews__container">
            <div className="reviews__container--avataar"></div>
            <div className="reviews__container--name"><h2>Tanvir</h2></div>
            <div className="reviews__container--text"> <h2> I loved this, it was amazing </h2></div>
       </div>
       <div className ="reviews__container">
            <div className="reviews__container--avataar"></div>
            <div className="reviews__container--name"><h2>John</h2></div>
            <div className="reviews__container--text"> <h2>This food was super nice, exact like homemade</h2></div>
       </div>
       <div className ="reviews__container">
            <div className="reviews__container--avataar"></div>
            <div className="reviews__container--name"><h2>Sam</h2></div>
            <div className="reviews__container--text"> <h2> It is little spicy but yummy!! </h2></div>
       </div>
   </section>
    
)
}
export default Comments;