import { Link } from "react-router";

const NavigationLink = ({ to, label, icon, disabled }: { to: string, label: string, icon: string, disabled: boolean }) => {
    const content = (
        <>
            {icon === 'left' && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            )}
            {label}
            {icon === 'right' && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            )}
        </>
    );

    return disabled ? (
        <span className="flex items-center gap-2 text-gray-500">{content}</span>
    ) : (
        <Link to={to} className="flex items-center gap-2">{content}</Link>
    );
};


export default NavigationLink;