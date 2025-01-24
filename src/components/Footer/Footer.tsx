const Footer: React.FC = () => {
    const today = new Date();

    return (
        <footer className="fixed left-0 bottom-0 flex justify-center items-center bg-gray-800 w-full h-[32px] p-2 z-50">
            <p>Copyright &copy; {today.getFullYear()}</p>
        </footer>
    );
};

export default Footer;