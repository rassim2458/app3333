import { useState } from "react";

import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";
import RightPanel from "../../components/common/RightPanel";
import { ProfileCard } from "../../components/common/ProfileCard ";

const HomePage = () => {
	const [feedType, setFeedType] = useState("forYou");

	return (
		<>
			<div className='flex-[4_4_0] mr-20 ml-20'>
						{/* Header */}
						
				<div className='flex w '>
					<div
						className={
							"flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
						}
						onClick={() => setFeedType("forYou")}
					>
						For you
						{feedType === "forYou" && (
							<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary'></div>
						)}
					</div>
					<div
						className='flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative'
						onClick={() => setFeedType("following")}
					>
						Following
						{feedType === "following" && (
							<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary'></div>
						)}
					</div>
				</div>
				
				{/*  CREATE POST INPUT */}
				<CreatePost />

				{/* POSTS */}
				<Posts feedType={feedType} />
				
			</div>
			<div className=""style={{ height: '200px' }}>
			<ProfileCard
				imageSrc="/avatar-placeholder.png"
				username="issam"
				email="issam@example.com"
				description="web app dev ..."
			/>  
			 <RightPanel />  
			</div>
		</>
	);
};
export default HomePage;