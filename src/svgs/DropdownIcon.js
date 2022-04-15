const DropdownIcon = () => {
    return (
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="dropdown">
                <g id="hamburger">
                    <rect id="bar 3" x="20" y="63" width="80" height="10" rx="5" style={{"--move-direction": '1'}}/>
                    <rect id="bar 2" x="20" y="43" width="80" height="10" rx="5" style={{"--move-direction": '0'}}/>
                    <rect id="bar 1" x="20" y="23" width="80" height="10" rx="5" style={{"--move-direction": '-1'}}/>
                </g>
            </g>
        </svg>
    );
}
 
export default DropdownIcon;


