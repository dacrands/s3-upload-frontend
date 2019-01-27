import React from 'react'
import { navigate, Link } from 'gatsby'

class Files extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        this.setState({ isLoading:true })
        fetch('http://192.168.0.115:5000/files', {
            credentials: 'include'
        })
            .then(res => {
                if (res.status !== 200) {
                    throw (res)
                }
                return res.json()
            })
            .then(response => {                
                this.setState({ files: response.files })
                this.setState({ isLoading:false })
                return
            })
            .catch(e => {
                console.error(e.text)
                navigate('/err', {state: {err: e.status, errText: e.statusText}})
                return
            })
    }

    render() {
        if (this.state.isLoading) {
            return <header className="header">
                <h1>Loading...</h1>
            </header>
        }
        return (
            <div>
                <header className="header">
                    <h1>{this.state.files.length} Files</h1>
                </header>
                <div className="files">
                    {
                        this.state.files[0]
                        ? this.state.files.map(file => (
                            <Link 
                                className="files__item" key={file.name}
                                to="/file"
                                state={{
                                    file: file.name,
                                    body: file.body,
                                    id: file.id,
                                }}

                            >
                                <h3>{file.name}</h3> 
                                <p>{file.body}</p>                        
                            </Link>
                        ))
                        : null
                    }
                </div>
            </div>
        )
    }
}


export default Files