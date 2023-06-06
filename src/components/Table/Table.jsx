import React from "react";
import '../Styles.css';
import '../Responsive.css';
import './Table.css';
import { Link } from "react-router-dom";

function Table(props) {

    let [users, setUsers] = React.useState(props)

    return (
        <>
            <h2>{props.title}</h2>
            <div className="tabla-scrollable">
                <table>
                    <thead>
                        <tr>
                            {users.columns.map((col, i) => {
                                return <th key={i}>{col}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {users.rows.map((row, i) => {
                            return <tr key={i}>
                                {Object.keys(row).map((element, j) => {
                                    if (element != "id") {
                                        return <td key={j}>{row[element]}</td>
                                    } else {
                                        let id = row["id"]
                                        return <td key={j + j}><Link to="/userProfile" state={{id}}>Detalles</Link></td>
                                    }
                                })}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default Table;