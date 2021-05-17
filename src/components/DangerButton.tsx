const DangerButton: React.FC = props => (
    <button className="bg-red hover:bg-red-lighter transition-colors duration-300 rounded-xl font-display text-grey font-bold text-l md:text-xl p-2 md:p-3 xl:p-4">
        {props.children}
    </button>
);

export default DangerButton;