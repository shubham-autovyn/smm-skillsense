import { Box, Card, Typography } from '@mui/material';
import { Green, Red, TypeSecondary } from '../../../Utilities/colors';
import getInitialName from '../../utils/getInitailName';

const ProfileCard = ({ data }) => {
    // const PhotoIcon = () => (
    //   <img
    //     style={{ height: "92px", width: "92px", marginRight: "1rem" }}
    //     src={data?.profileImage ? data?.profileImage : Photo}
    //   />
    // );

    const PhotoIcon = () => (
        <Box
            sx={{
                position: 'relative',
                width: '92px',
                height: '92px',
                display: 'flex',
                justifyContent: 'center',
                // alignItems: "center",
            }}
        >
            {/* Profile Image */}
            {data?.profileImage ? (
                <img
                    src={data?.profileImage}
                    alt="profile"
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover',
                    }}
                />
            ) : (
                <div
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        backgroundColor: 'rgb(226 225 225)',
                        color: '#555',
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    {getInitialName(data?.name)}
                </div>
            )}

            {/* Trainee Flag */}
            {data?.is_trainee && (
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '9px',
                        backgroundColor: '#000000a8',
                        color: '#fff',
                        padding: '2px 6px',
                        borderRadius: '10px',
                        fontSize: '8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontWeight: 'bold',
                    }}
                >
                    Trainee
                </Box>
            )}
        </Box>
    );

    const convertDaysToYearsMonthsDays = (totalDays) => {
        const years = Math.floor(totalDays / 365);
        const remainingDaysAfterYears = totalDays % 365;
        const months = Math.floor(remainingDaysAfterYears / 30);
        const days = remainingDaysAfterYears % 30;

        const result = [];

        if (years > 0) result.push(`${years} year${years > 1 ? 's' : ''}`);
        if (months > 0) result.push(`${months} month${months > 1 ? 's' : ''}`);
        if (days > 0) result.push(`${days} day${days > 1 ? 's' : ''}`);

        return result.join(', ');
    };

    return (
        <>
            <Box>
                <Card
                    sx={{
                        maxWidth: '380px',
                        width: '209px',
                        height: '210px',
                        bgcolor: '#F4F5F8',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease-in',
                        '&:hover': {
                            backgroundColor: '#eef3fd',
                            '& .photo-icon': {
                                transform: 'scale(1.2)',
                            },
                            '& .margin': {
                                marginTop: '1rem',
                            },
                        },
                    }}
                >
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            className="photo-icon"
                            sx={{ transition: 'transform 0.4s ease-in' }}
                        >
                            <PhotoIcon />
                        </Box>
                        <Typography
                            variant="h5"
                            sx={{
                                paddingTop: '0.1rem',
                                transition: 'margin-top 0.4s ease-in',
                                textAlign: 'center',
                            }}
                            className="margin"
                        >
                            {data?.name}
                        </Typography>
                        <Typography variant="body1" sx={{ paddingTop: '1rem' }}>
                            {data?.staffId} | {data?.level}
                        </Typography>
                        <Box sx={{ marginTop: '1.1rem' }}>
                            <Typography
                                variant="body1"
                                sx={{ color: TypeSecondary }}
                                component={'span'}
                            >
                                Relieving in:
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color:
                                        data?.days_until_relieving > 26
                                            ? Green
                                            : Red,
                                }}
                                component={'span'}
                            >
                                {convertDaysToYearsMonthsDays(
                                    data?.days_until_relieving
                                )}
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </>
    );
};
export default ProfileCard;
