
const AlbumCard = ({ album }) => {
    return (
        <div className="album">
            <div>
                <p>{album.title}</p>
            </div>
        </div>
    );
};

export default AlbumCard;