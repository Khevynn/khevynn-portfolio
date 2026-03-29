function RatingStar({ rating }) {
  return (
    <div className="flex items-center gap-1 text-sm">
      {(() => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
          if (i < Math.floor(rating)) {
            // Full star
            stars.push(<i key={i} className="fa fa-star text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />);
          } else if (
            i < rating &&
            rating % 1 !== 0 &&
            i === Math.floor(rating)
          ) {
            // Half star
            stars.push(<i key={i} className="fa fa-star-half-o text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />);
          } else {
            // Empty star
            stars.push(<i key={i} className="fa fa-star-o text-gray-600" />);
          }
        }
        return stars;
      })()}
    </div>
  );
}

export default RatingStar;
