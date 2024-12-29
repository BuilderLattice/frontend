"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import GitHubCalendar from 'react-github-calendar'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Image from 'next/image'

const userData = {
    linkedinUsername: "adipundir",
    githubUsername: "adipundir",
    name: "Aditya Pundir",
    email: "pundir.aditya@outlook.com",
    address: "0xf215A0De65a988c3344Ae6c25858D29854C64896",
    linkedinProfile: {
        fullName: "Aditya Pundir",
        about: "I'm a certified CEHv9 professional by EC-Council. I achieved this certification when I was just 13 years old, demonstrating my passion for technology and commitment to learning. I have deep understanding of Typescript, React, Nextjs, and React Native. I'm always eager to expand my knowledge of the latest technologies. Let's connect and see how we can collaborate!",
        headline: "CEHv9 Certified | NextJS l Solidity | Aptos Move",
        location: "Noida, Uttar Pradesh, India",
        profile_photo: "https://media.licdn.com/dms/image/v2/D5603AQF273YDOc75zA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1712984398344?e=2147483647&v=beta&t=E8yljbDdkZnX4OLJdRIFCWN9XHZn4tISgA80rua63qQ",
        followers: "2K followers",
        connections: "500+ connections",
        certification: [
            {
                company_image: "https://media.licdn.com/dms/image/v2/C560BAQHPon7g_XjJpA/company-logo_100_100/company-logo_100_100/0/1631371916365?e=2147483647&v=beta&t=lDfP7RQPNdE3bdrCvE7sRLorkCvxBcUVmWp4qu3Tth8",
                certification: "Certified Ethical Hacker (CEH)",
                company_name: "EC-Council",
                issue_date: "Issued Aug 2016 - Expires Aug 2019",
                credential_id: "Credential ID ECC28723000719"
            }
        ],
        education: [
            {
                college_name: "ABES Engineering College",
                college_image: "https://media.licdn.com/dms/image/v2/C510BAQGHhq9X-H8LyQ/company-logo_100_100/company-logo_100_100/0/1631345366169?e=2147483647&v=beta&t=Ph2iXSQWAvjb6sKEWI1YIxR8cYbHj_Zzu2L__1D6w98",
                college_degree: "Bachelor of Technology - BTech",
                college_degree_field: "Computer Science",
                college_duration: "2022 - 2026",
            },
            {
                college_name: "K.L. International School",
                college_image: "https://media.licdn.com/dms/image/v2/C560BAQF25Nm5tTtVmQ/company-logo_100_100/company-logo_100_100/0/1630659679977/k_l_international_school_logo?e=2147483647&v=beta&t=NDUHFRHhmWNvxGwlr7dS3qHr7hUzEMk0wKBMeBZVVXA",
                college_degree: "Science (PCM)",
                college_duration: "2008 - 2021",
            }
        ],
        experience: [
            {
                position: "Student",
                company_image: "https://media.licdn.com/dms/image/v2/C510BAQGHhq9X-H8LyQ/company-logo_100_100/company-logo_100_100/0/1631345366169?e=2147483647&v=beta&t=Ph2iXSQWAvjb6sKEWI1YIxR8cYbHj_Zzu2L__1D6w98",
                company_name: "ABES Engineering College",
                location: "Ghaziabad, Uttar Pradesh, India",
                summary: "Studying B.tech Computer Science",
                starts_at: "Nov 2022",
                ends_at: "Present",
                duration: "2 years 2 months"
            },
            {
                position: "React Developer Intern",
                company_image: "https://media.licdn.com/dms/image/v2/C560BAQFee1CaaV6dLA/company-logo_100_100/company-logo_100_100/0/1631338010352?e=2147483647&v=beta&t=LYz3X2N1IbluZLYd5vMEMpmP089bhegGQ-dGeWabiV0",
                company_name: "Simplifii Labs Private Limited",
                summary: "Develop complex websites in React using Typescript, Focusing on implementing clean and practical UI",
                starts_at: "Nov 2023",
                ends_at: "Nov 2024",
                duration: "1 year 1 month"
            }
        ],
        background_cover_image_url: "https://media.licdn.com/dms/image/v2/C4E16AQH_qPXJqWdGqw/profile-displaybackgroundimage-shrink_200_800/profile-displaybackgroundimage-shrink_200_800/0/1630613093758?e=2147483647&v=beta&t=L0Np73RRjjvyfrnk-pFwQCnW49evtg__Fr5e37bU5kU"
    },
    githubProfile: {
        topLanguages: {
            TypeScript: 69.64,
            JavaScript: 16.28,
            Python: 12.2,
            CSS: 1.87
        },
        activity: {
            totalCommits: 219,
            totalPRs: 6,
            contributedTo: 9
        }
    },
    devScore: 725
}

async function getAIPersona(userData: any): Promise<string> {
    // This is a mock function. In a real application, you would call an AI service here.
    return "Aditya is a highly motivated and accomplished young professional with a passion for technology and cybersecurity. Having achieved CEHv9 certification at the age of 13, Aditya demonstrates exceptional aptitude and dedication to the field. With a strong foundation in TypeScript, React, Next.js, and React Native, Aditya is well-versed in modern web development technologies. Their GitHub activity shows a particular focus on TypeScript projects, indicating a preference for strongly-typed languages and robust application development. Aditya's experience as a React Developer Intern at Simplifii Labs Private Limited has further honed their skills in creating complex, user-friendly web applications. Currently pursuing a B.Tech in Computer Science, Aditya continues to expand their knowledge and stay at the forefront of technological advancements. With a DevScore of 725, Aditya shows promise as a rising talent in the tech industry, combining theoretical knowledge with practical skills and a proactive approach to learning and development.";
}

export default async function ProfilePage() {
    const aiPersona = await getAIPersona(userData);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="relative h-48 bg-gray-300">
                <Image
                    src={userData.linkedinProfile.background_cover_image_url}
                    alt="Profile background"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative -mt-24">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <div className="sm:flex sm:space-x-5">
                                <div className="flex-shrink-0">
                                    <Avatar className="h-20 w-20 border-4 border-white">
                                        <AvatarImage src={userData.linkedinProfile.profile_photo} alt={userData.name} />
                                        <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:pt-1 sm:text-left">
                                    <p className="text-xl font-bold text-gray-900 sm:text-2xl">{userData.name}</p>
                                    <p className="text-sm font-medium text-gray-600">{userData.linkedinProfile.headline}</p>
                                    <p className="text-sm text-gray-500 mt-1">{userData.linkedinProfile.location}</p>
                                </div>
                            </div>
                            <div className="mt-5 flex justify-center sm:mt-0">
                                <a href={`https://linkedin.com/in/${userData.linkedinUsername}`} className="text-gray-400 hover:text-gray-500 mx-2">
                                    <FaLinkedin size={24} />
                                </a>
                                <a href={`https://github.com/${userData.githubUsername}`} className="text-gray-400 hover:text-gray-500 mx-2">
                                    <FaGithub size={24} />
                                </a>
                                <a href={`mailto:${userData.email}`} className="text-gray-400 hover:text-gray-500 mx-2">
                                    <MdEmail size={24} />
                                </a>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>About</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{userData.linkedinProfile.about}</p>
                                    </CardContent>
                                </Card>

                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle>Experience</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {userData.linkedinProfile.experience.map((exp, index) => (
                                            <div key={index} className="mb-4">
                                                <div className="flex items-center">
                                                    <Avatar className="h-10 w-10 mr-3">
                                                        <AvatarImage src={exp.company_image} alt={exp.company_name} />
                                                        <AvatarFallback>{exp.company_name[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h3 className="font-semibold">{exp.position}</h3>
                                                        <p className="text-sm text-gray-600">{exp.company_name}</p>
                                                        <p className="text-xs text-gray-500">{exp.starts_at} - {exp.ends_at} · {exp.duration}</p>
                                                    </div>
                                                </div>
                                                <p className="mt-2 text-sm">{exp.summary}</p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle>Education</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {userData.linkedinProfile.education.map((edu, index) => (
                                            <div key={index} className="mb-4">
                                                <div className="flex items-center">
                                                    <Avatar className="h-10 w-10 mr-3">
                                                        <AvatarImage src={edu.college_image} alt={edu.college_name} />
                                                        <AvatarFallback>{edu.college_name[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h3 className="font-semibold">{edu.college_name}</h3>
                                                        <p className="text-sm text-gray-600">{edu.college_degree}{edu.college_degree_field ? `, ${edu.college_degree_field}` : ''}</p>
                                                        <p className="text-xs text-gray-500">{edu.college_duration}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle>GitHub Activity</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between mb-4">
                                            <div>
                                                <p className="text-2xl font-bold">{userData.githubProfile.activity.totalCommits}</p>
                                                <p className="text-sm text-gray-600">Total Commits</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold">{userData.githubProfile.activity.totalPRs}</p>
                                                <p className="text-sm text-gray-600">Total PRs</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold">{userData.githubProfile.activity.contributedTo}</p>
                                                <p className="text-sm text-gray-600">Contributed To</p>
                                            </div>
                                        </div>
                                        <GitHubCalendar username={userData.githubUsername} />
                                    </CardContent>
                                </Card>
                            </div>

                            <div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Skills</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {Object.entries(userData.githubProfile.topLanguages).map(([lang, percentage]) => (
                                                <Badge key={lang} variant="secondary">
                                                    {lang} {percentage.toFixed(1)}%
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle>Certifications</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {userData.linkedinProfile.certification.map((cert, index) => (
                                            <div key={index} className="mb-4">
                                                <div className="flex items-center">
                                                    <Avatar className="h-10 w-10 mr-3">
                                                        <AvatarImage src={cert.company_image} alt={cert.company_name} />
                                                        <AvatarFallback>{cert.company_name[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h3 className="font-semibold">{cert.certification}</h3>
                                                        <p className="text-sm text-gray-600">{cert.company_name}</p>
                                                        <p className="text-xs text-gray-500">{cert.issue_date}</p>
                                                    </div>
                                                </div>
                                                <p className="mt-2 text-xs text-gray-500">{cert.credential_id}</p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle>Dev Score</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center">
                                            <p className="text-4xl font-bold text-blue-600">{userData.devScore}</p>
                                            <p className="text-sm text-gray-600 mt-2">Based on GitHub activity and contributions</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle>AI-Generated Persona</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm">{aiPersona}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

