function UserProfile(props){
    return(
        <div style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
            <h2 style={{ color: 'blue' }}>{props.name}</h2>
            <p><span style={{ fontWeight: 'bold' }}>Age:</span> {props.age}</p>
            <p><span style={{ fontWeight: 'bold' }}>Bio:</span> {props.bio}</p>
        </div>
    )
}
export default UserProfile;