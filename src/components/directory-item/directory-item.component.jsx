import './directory-item.styles.scss';
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({ category }) => {
    const { id, title, imageUrl, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => {
        navigate(route);
    };

    return (
        <div onClick={onNavigateHandler} key={id} className="directory-item-container">
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <div className="directory-item-body">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    );
};

export default DirectoryItem;
