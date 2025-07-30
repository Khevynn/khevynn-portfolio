function RatingStar({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {(() => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
          if (i < Math.floor(rating)) {
            // Full star
            stars.push(<i className="fa fa-star text-orange-500" />);
          } else if (
            i < rating &&
            rating % 1 !== 0 &&
            i === Math.floor(rating)
          ) {
            // Half star
            stars.push(<i className="fa fa-star-half-o text-orange-500" />);
          } else {
            // Empty star
            stars.push(<i className="fa fa-star-o" />);
          }
        }
        return stars;
      })()}
    </div>
  );
}

export default RatingStar;
