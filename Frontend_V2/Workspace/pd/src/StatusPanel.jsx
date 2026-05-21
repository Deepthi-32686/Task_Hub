import React from 'react';

function StatusPanel({ status, onUpdate }) {
    return (
        <div className="status-panel">
            <p>Status: <strong>{status}</strong></p>
            <div className="button-group">
                <button onClick={() => onUpdate('on work')}> Active</button>
                <button onClick={() => onUpdate('sleeping')}> Inactive</button>
                <button onClick={() => onUpdate('fucking russian')}> Busy </button>
            </div>
        </div>
    );
}

export default StatusPanel;