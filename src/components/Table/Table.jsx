import React from "react";
import '../../Styles.css';
import './Table.css';
import './Responsive.css';
import { Link } from "react-router-dom";

function Table(props) {

    let [data, setData] = React.useState(props)

    return (
        <>
            <div className="mi-table">
                <h2>{props.title}</h2>
                <div className="tabla-scrollable">
                    <table>
                        <thead>
                            <tr>
                                {data.columns.map((col, i) => {
                                    return <th key={i}>{col}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {data.rows.map((row, i) => {
                                return <tr className="mi-row" key={i}>
                                    {Object.keys(row).map((element, j) => {
                                        if (element != "id") {
                                            return <td key={j}>{row[element]}</td>
                                        } else if (props.title === "Lista de Categorias" && element == "id") {
                                            let id = row["id"]
                                            return <td key={j}><a href={`http://localhost:3000/product/list?category=${id}`} target="_blank">Detalles</a></td>
                                        } else {
                                            if (props.title != "Listado de Productos") {
                                                let id = row["id"]
                                                return <td key={j + j + j}><Link to="/userProfile" state={{ id }}>Detalles</Link></td>
                                            } else {
                                                let id = row["id"]
                                                return <td key={j + j + j}><Link to="/productDetail" state={{ id }}>Detalles</Link></td>
                                            }
                                        }
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}

export default Table;