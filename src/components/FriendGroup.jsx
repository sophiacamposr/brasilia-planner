import React from 'react';

function FriendGroup({ selectedName }) {
    const friends = [
        { name: 'Nana', photo: 'https://via.placeholder.com/100?text=Nana' },
        { name: 'Bela', photo: 'https://via.placeholder.com/100?text=Bela' },
        { name: 'Maeva', photo: 'https://via.placeholder.com/100?text=Maeva' },
        { name: 'Mala', photo: 'https://via.placeholder.com/100?text=Mala' },
        { name: 'Ana F', photo: 'https://via.placeholder.com/100?text=Ana+F' },
        { name: 'Sophia', photo: 'https://via.placeholder.com/100?text=Sophia' },
    ];

    return (
        <section className="friend-group">
            <h2>👫 The Squad</h2>
            <div className="friends-container">
                {friends.map((friend) => (
                    <div
                        key={friend.name}
                        className={`friend ${
                            selectedName === friend.name ? 'selected' : ''
                        }`}
                        style={{
                            textAlign: 'center',
                            border:
                                selectedName === friend.name
                                    ? '2px solid #4CAF50'
                                    : '2px solid transparent',
                            padding: '5px',
                            borderRadius: '10px',
                        }}
                    >
                        <img
                            src={friend.photo}
                            alt={friend.name}
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                            }}
                        />
                        <p
                            style={{
                                fontWeight:
                                    selectedName === friend.name ? 'bold' : 'normal',
                                marginTop: '10px',
                            }}
                        >
                            {friend.name}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FriendGroup;
