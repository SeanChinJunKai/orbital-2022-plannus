import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../../assets/Report.css';

function ReportPage() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_k1cgql9', 'template_754ed7s', form.current, 'dmSGQByQIsdAnbDYF')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
    };

    return (
        <div className='report-page-container'>
            
            <form className='report-form' ref={form} onSubmit={sendEmail}>
                <h1>Submit Bug Report</h1>
                <select defaultValue={""} className='report-form-group' required type="text" name="issue" >
                    <option value={""} disabled className='report-issue-option'>Select Issue Type...</option>
                    <option className='report-issue-option'>Design</option>
                    <option className='report-issue-option'>Broken Functionality</option>
                    <option className='report-issue-option'>Data Not Updated</option>
                    <option className='report-issue-option'>Account Issues</option>
                    <option className='report-issue-option'>Disruptive User/Posted Content</option>
                </select>

                <input placeholder='Name' className='report-form-group' required type="text" name="name" />

                <input placeholder='Email' className='report-form-group' required type="email" name="email" />

                <textarea style={{'resize': 'none'}} placeholder='Details of bug' required name="message" />

                <input className='report-submit-btn' type="submit" value="Submit" />
            </form>
            
        </div>
    )
}

export default ReportPage