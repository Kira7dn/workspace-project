import ChildProject from './ChildProject';
import styles from './ChildrenProject.module.css';

const ChildrenProject = ({ children }) => {
    return (
        <div
            as="ol"
            className={`${styles.list} col-8 d-flex justify-content-end`}
        >
            {children.map((child) => (
                <div as="li" key={child._id} className={styles.listItem}>
                    <ChildProject child={child} />
                </div>
            ))}
        </div>
    );
};
export default ChildrenProject;
