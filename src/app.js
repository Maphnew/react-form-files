import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; 
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import Avatar from './components/upload';
import Download from './components/download';

class App extends React.Component { 

	state = { 

        // Initially, no file is selected 
        selectedFile: null,
        downloadedImage: ''
    }; 
        
    // On file select (from the pop up) 
    onFileChange = event => { 
        console.log(event.target.files[0])
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] }); 
	
	}; 
	
	// On file upload (click the upload button) 
	onFileUpload = () => { 
	
        // Create an object of formData 
        const formData = new FormData(); 
        
        // Update the formData object 
        formData.append( 
            "file", 
            this.state.selectedFile, 
            this.state.selectedFile.name 
        ); 
        
        // Details of the uploaded file 
        console.log(this.state.selectedFile); 
        
        // Request made to the backend api 
        // Send formData object 
        axios.post("http://localhost:3000/upload", formData); 
	}; 
	
	// File content to be displayed after 
	// file upload is complete 
	fileData = () => { 
	
	if (this.state.selectedFile) { 
		
		return ( 
		<div> 
			<h2>File Details:</h2> 
			<p>File Name: {this.state.selectedFile.name}</p> 
			<p>File Type: {this.state.selectedFile.type}</p> 
			<p> 
			Last Modified:{" "} 
			{this.state.selectedFile.lastModifiedDate.toDateString()} 
			</p> 
		</div> 
		); 
	} else { 
		return ( 
		<div> 
			<br /> 
			<h4>Choose before Pressing the Upload button</h4> 
		</div> 
		); 
	} 
	}; 
    
    onDownload = (str) => {
        console.log(str)
        this.setState({
            downloadedImage: str
        })
    }

    componentDidMount() {
        axios.post("http://localhost:3000/download", {
          "name": "images.png"
        }).then((image) => {
            const svg = image.data

            this.onDownload(svg)
        })
    }

	render() { 
        console.log(this.state)
        return ( 
            <div> 
                <h1> File Upload Test </h1> 
                <h3> File Upload using React! </h3> 
                <div> 
                    <input type="file" onChange={this.onFileChange} /> 
                    <button onClick={this.onFileUpload}> 
                    Upload! 
                    </button> 
                </div> 
                {this.fileData()} 
                <Avatar 
                    // selectedFile={this.state.selectedFile}
                    // onFileUpload={this.onFileUpload}
                    // onFileChange={this.onFileChange}
                />
                <Download downloadedImage={this.state.downloadedImage}/>
            </div> 
        ); 
	} 
} 


ReactDOM.render(<App />, document.getElementById('app'));