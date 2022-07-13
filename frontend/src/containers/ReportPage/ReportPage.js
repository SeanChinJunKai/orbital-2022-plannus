import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../../assets/Report.css';
import { toast } from 'react-toastify';

function ReportPage() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_k1cgql9', 'template_754ed7s', form.current, 'dmSGQByQIsdAnbDYF')
        .then((result) => {
            toast.success("Your report has been sent successfully.")
        }, (error) => {
            toast.success("An error has occurred while sending your report. Please try again.")
        });
        e.target.reset();
    };

    return (
        <div className='report-page-container'>
            
            <form className='report-form' ref={form} onSubmit={sendEmail}>
                <h1>Submit Bug Report</h1>
                <select defaultValue={""} className='report-form-group' required type="text" name="issue" >
                    <option value={""} disabled className='report-issue-option'>Select Issue Type...</option>
                    <option value="Design Issues" className='report-issue-option'>Design Issues</option>
                    <option value="Broken Functionality" className='report-issue-option'>Broken Functionality</option>
                    <option value="Data Not Updated" className='report-issue-option'>Data Not Updated</option>
                    <option value="Account Issues" className='report-issue-option'>Account Issues</option>
                    <option value="Disruptive User/Content" className='report-issue-option'>Disruptive User/Content</option>
                    <option value="Others" className='report-issue-option'>Others</option>
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