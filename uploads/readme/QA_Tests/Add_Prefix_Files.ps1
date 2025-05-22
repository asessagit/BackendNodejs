# Define a function to add a prefix to the first 6 characters of file names
function Add-Prefix-To-Files {
    param (
        [string]$Path,
        [string]$Prefix
    )

    Get-ChildItem -Path $Path -File | ForEach-Object {
        if ($_.Extension -ne ".ps1") {
            # Remove all characters before the second underscore
            $newName = $_.Name -replace '^[^_]*_[^_]*_', ''
            # Add the prefix
            $newName = $Prefix + $newName
            # Replace multiple underscores with a single underscore
            $newName = $newName -replace '_+', '_'
            Rename-Item -Path $_.FullName -NewName $newName
        }
    }
}

# Call the function with the specified directory
Add-Prefix-To-Files -Path "c:\Users\Administrador\BackendNodejs\uploads\readme\QA_Tests" -Prefix "QA_Tests"