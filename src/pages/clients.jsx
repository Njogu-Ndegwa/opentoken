import * as React from 'react';
import "./client.css";

export function ClientPage({ historyData, isLoading }) {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Token</th>
                        <th>Type</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="4" className="loading">Loading...</td>
                        </tr>
                    ) : (
                        historyData?.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.token}</td>
                                <td>{item.token_type}</td>
                                <td>{item.token_value}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
