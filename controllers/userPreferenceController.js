import pool from '../config/db.js';
import languages from '../public/constants/languages.js';
import countries from '../public/constants/countries.js';

// Saving preferences of a User
export async function SaveUserPreference (req, res){
    const userId = req.userId;
    console.log(userId);
    const { preferredCity, preferredCategory, language , country } = req.body;
    const language_code = languages.find((element) => element.name.toLowerCase() == language.toLowerCase())|| null;
    let code = null;
    if(language_code !== null)
        code = language_code.code;
    const country_code = countries.find((element) => element[0].toLowerCase() == country.toLowerCase())[1]|| null;
    try {
        // Insert new preferences if not exist
        const insertQuery = `
                INSERT INTO user_preferences (user_id, preferred_city, preferred_category, language , country)
                VALUES ($1, $2, $3, $4, $5);
            `;

        // Insert values only if they are provided, else insert nulls
        await pool.query(insertQuery, [
            userId,
            preferredCity.toLowerCase() || null,
            preferredCategory || null,
            code || null,
            country_code || null
        ]);

        return res.status(201).json({ message: 'Preferences saved successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
};


// Updating users preferences through PUT route  
export async function UpdateUserPreferences(req, res){
    const userId = req.userId;
    const { preferredCity, preferredCategory, language , country  } = req.body;
    const language_code = languages.find((element) => element.name.toLowerCase() == (language ? language.toLowerCase():language));
    let code ;
    if(language_code)
        code = language_code.code;
    let country_code = countries.find((element) =>  element[0].toLowerCase() == (country ? country.toLowerCase(): country));

    if(country_code)
        country_code = country_code[1];
    try {
        // Check if user preferences already exist
        const existingPreferences = await pool.query('SELECT * FROM user_preferences WHERE user_id = $1', [userId]);
        console.log("done");
        if (existingPreferences.rows.length > 0) {
            // Update existing preferences
            const updateQuery = `
                    UPDATE user_preferences
                    SET 
                        preferred_city = COALESCE($1, preferred_city),
                        preferred_category = COALESCE($2, preferred_category),
                        language = COALESCE($3, language),
                        country = COALESCE($4, country)
                    WHERE user_id = $5;
                `;

            // Passing in values from the body, if not provided, we use the existing value (COALESCE is used for this purpose)
            await pool.query(updateQuery, [
                preferredCity.toLowerCase() ,
                preferredCategory ,
                code,
                country_code,
                userId
                
            ]);

            return res.status(200).json({ message: 'Preferences updated successfully!' });
        } else {
            return res.status(404).json({ error: 'Preferences not found. Please initialize them first.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
};




// Deleting a user 
export async function deleteUser(req, res){
    try {
        const result = await pool.query("DELETE FROM users WHERE id= $1", [req.userId]);
        return res.status(200).json({ message: 'User deleted successfully!' });
    }
    catch (err) {
        return res.status(500).json({ message: "Unable to delete user at the moment. Try again later." });
    }
}


// Deleting users preferences 
export async function deletePreferences(req, res){
    try {
        const result = await pool.query("DELETE FROM user_preferences WHERE user_id= $1", [req.userId]);
        return res.status(200).json({ message: 'User preferences deleted successfully!' });
    }
    catch (err) {
        return res.status(500).json({ message: "Unable to delete preferences at the moment. Try again later." });
    }
}
