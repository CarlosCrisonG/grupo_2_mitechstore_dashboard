import React from "react";
import '../Styles.css';
import '../Responsive.css';
import './Table.css';

class Lists extends React.Component {


    //Validación para mostrar Next y Prev - PENDIENTE

    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <div class="tabla-scrollable">
                    <table>
                        <thead>
                            <tr>
                                {this.props.columns.map((col, i) => {
                                    return <th key={i}>{col}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.rows.map((row, i) => {
                                return <tr key={i}>
                                    {Object.keys(row).map((element, j) => {
                                        return <td key={j}>{row[element]}</td>
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default Lists;