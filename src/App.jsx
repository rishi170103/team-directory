import { useState } from 'react';
import './App.css';
import TeamCard from './TeamCard.jsx';
import Search from './searchmember.jsx'

const initialTeamMembers = [
  {
    id: 1,
    name: 'Rishi',
    role: 'Developer',
    experience: 2,
  },
  {
    id: 2,
    name: 'Anbu',
    role: 'Tester',
    experience: 2,
  },
  {
    id: 3,
    name: 'Vijay',
    role: 'Manager',
    experience: 4,
  },
];

function App() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [team, setTeam] = useState(initialTeamMembers);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search,setSearch]=useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMember = {
      id: team.length + 1,
      name,
      role,
      experience,
    };

    setTeam([...team, newMember]);
    setName('');
    setRole('');
    setExperience('');
    setShowForm(false);
  };

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setName('');
    setRole('');
    setExperience('');
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) return;
    setTeam((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
    setSelectedIds([]);
  };
  const filteredMembers=team.filter((member)=>member.name.toLowerCase().includes(search.toLowerCase()));
   
  return (
    <div className="app-container">
       <h2> JoiningMember</h2>
      {!showForm && (
        <div className="controls">
          <button type="button" className="open-form" onClick={handleOpenForm}>
            Add Member
          </button>
        </div>
      )}

      {showForm && (
        <form className="team-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
          />
        </div>

        <div className="form-row">
          <label>Role</label>
          <input
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter a role"
          />
        </div>

        <div className="form-row">
          <label>Experience</label>
          <input
            id="experience"
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Years of experience"
          />
        </div>

          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel} className="cancel">
              Cancel
            </button>
          </div>
        </form>
      )}
      <div style={{ marginTop: 16 }}>
        <button
          type="button"
          className="delete-selected"
          onClick={deleteSelected}
          disabled={selectedIds.length === 0}
        >
          Delete Selected ({selectedIds.length})
        </button>
      </div>

      <div className="team-list">
        {team.map((member) => (
          <TeamCard
            key={member.id}
            id={member.id}
            name={member.name}
            role={member.role}
            experience={member.experience}
            selected={selectedIds.includes(member.id)}
            onToggle={toggleSelect}
          />
        ))}
      </div>
        <Search search={search} setSearch={setSearch}/>
        <div>
               <div className="team-list">
  {filteredMembers.map((member) => (
    <TeamCard
      key={member.id}
      id={member.id}
      name={member.name}
      role={member.role}
      experience={member.experience}
      selected={selectedIds.includes(member.id)}
      onToggle={toggleSelect}
    />
  ))}
</div>
        </div>
      
      
    </div>
    
  );
}

export default App;