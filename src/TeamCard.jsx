function TeamCard({ id, name, role, experience, selected = false, onToggle }) {
    return (
        <div className="casd team-card">
            <label className="select">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onToggle && onToggle(id)}
                />
            </label>
            <div className="card-content">
                <h3>name: {name}</h3>
                <p>role: {role}</p>
                <p>experience: {experience}</p>
            </div>
        </div>
    );
}

export default TeamCard;