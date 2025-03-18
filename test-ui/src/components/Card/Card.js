const Card = (props) => {
  const { info, width, height } = props;

  return (
    <div style={{ width:"190px"}}>
        {
        info.poster_path ? (
            <img
            key={`${info.poster_path}`}
            alt={`${info.poster_path}`}
            src={`https://image.tmdb.org/t/p/original/${info.poster_path}`}
            width={width || 190}
            height={height || 285}
            />
        ) : (
            <div
            style={{
                width: width || 190,
                height: height || 285,
                backgroundColor: "#d3d3d3",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                fontWeight: "bold",
            }}
            >
            Image not found
            </div>
        )
        }

      <div>
        <p className="mb-0 mw-100 text-truncate font-weight-bold">{info.title || info.original_title || info.name || info.original_name}</p>
        <p className="mb-0">{info.release_date || info.first_air_date}</p>
        <p className="mb-0 ">{info.vote_average} / 10</p>
      </div>
    </div>
  );
};

export default Card;
