const HomePage = () => {
	const [feedType, setFeedType] = useState("forYou");

	return (
		<div className="flex flex-col md:flex-row justify-center items-start mt-20">
			<div className="w-full md:w-3/4 max-w-screen-lg">
				{/* Header */}
				<div className="flex">
					<div
						className={
							"tab" + (feedType === "forYou" ? " active" : "")
						}
						onClick={() => setFeedType("forYou")}
					>
						For you
					</div>
					<div
						className={
							"tab" + (feedType === "following" ? " active" : "")
						}
						onClick={() => setFeedType("following")}
					>
						Following
					</div>
				</div>

				{/* CREATE POST INPUT */}
				<CreatePost />

				{/* POSTS */}
				<Posts feedType={feedType} />
			</div>
			<div className="w-full md:w-1/4 mt-8 md:mt-0">
				<ProfileCard
					imageSrc="/avatar-placeholder.png"
					username="issam"
					email="issam@example.com"
					description="web app dev ..."
				/>
				<RightPanel />
			</div>
		</div>
	);
};

export default HomePage;
