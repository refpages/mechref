from TexSoup import TexSoup
import shutil
import re
import os
import difflib
import pprint


#Usage: Run this file to convert a .tex file into a .astro file
#tex files are read from tex/course/page.tex
#astro files are written to Astro/coursetags[course]/page.astro

coursetags = {
    'md':'Machine Design',
}

course = 'md'
page='vw'

tex_files = list(sorted([file[:-4] for file in os.listdir(f'tex/{course}') if file[-4:] == '.tex' and (file != 'main.tex')]))

print(tex_files)

if not os.path.exists(f'Astro/{coursetags[course]}'):
     os.mkdir(f'Astro/{coursetags[course]}')


replacements = {
    'section': 'Section',
    'subsection': 'SubSection',
    'subsubsection': 'SubSubSection',
    'blue': 'BlueText',
    'red': 'RedText',
    'textit': 'em',
    'textbf': 'strong',
    "caption": "em"
}

for filename in tex_files:
    required_modules = ['Image']

    tex_path = f"tex/{course}/{page}.tex"

    astro_path = f"astro/{coursetags[course]}/{filename.lower().replace(' ', '_')}.astro"

    with open(tex_path, 'r+') as file:
        raw = file.read()

        data = TexSoup(raw)

        # matches = re.sub(r'(?<=\n)(?!\s*\\)(.*?)(?<!\})(?=\n)', raw)

        raw = re.sub(r'(?<=\n)(?!\s*\\)(.*?)(?<!\})(?=\n)', lambda m: f"<p>{m.group(1)}</p>", raw, flags=re.DOTALL)

        paragraph_regex = [r"\\paragraph\{([^}]*)\}\s*(.*?)(?=(\\[a-zA-Z]+|\Z))",
                           r"\\paragraph\{([^}]*)\}\s*(.*?)(?=(\\[a-zA-Z]+|\Z))",
                           r"\\paragraph\{([^}]*)\}\s*([^\\]*)"]


        # Function to process each match
        def replace_paragraph(match):
            title = match.group(1).strip()
            text = match.group(2).strip()
            # Example transformation: Wrap title and text in a custom format
            return f"<h4><strong>{title}</strong></h4>\n<p>{text}</p> \n\n"


        # Use re.sub to replace all matches
        for p in paragraph_regex:
            raw = re.sub(p, replace_paragraph, raw)

        eregex = r"\\emph\{([^}]*)\}"

        # Use re.sub to replace \emph{} with <strong>
        raw = re.sub(eregex, r"<strong>\1</strong>", raw)

        uregex = r"\\underline\{([^}]*)\}"

        # Use re.sub to replace \emph{} with <strong>
        raw = re.sub(uregex, r"<u>\1</u>", raw)

        refregex = r"\\ref\{([^}]*)\}"

        # Use re.sub to replace \emph{} with <strong>
        raw = re.sub(refregex, r"<OrangeText>\1</OrangeText>", raw)

        eqrefregex = r"~\\eqref\{([^}]*)\}"

        # Use re.sub to replace \emph{} with <strong>
        raw = re.sub(eqrefregex, r"<OrangeText>\1</OrangeText>", raw)

        tealregex = r"\\teal\{([^}]*)\}"

        # Use re.sub to replace \emph{} with <strong>
        raw = re.sub(tealregex, r"<TealText>\1</TealText>", raw)

        blueregex = r"\\blue\{([^}]*)\}"

        # Use re.sub to replace \emph{} with <strong>
        raw = re.sub(blueregex, r"<BlueText>\1</BlueText>", raw)


        iregex = r"\\item\s+(.*)"

        # Use re.sub to replace \emph{} with <strong>
        raw = re.sub(iregex, r"<Item>\1</Item>", raw)


        def transform_itemize(match):
            items = match.group(1)  # Capture the content inside the environment
            # Replace \item with <Item></Item>
            items_transformed = re.sub(r"\\item\s+(.*)", r"<Item>\1</Item>", items)
            # Wrap the environment content with <Itemize>
            return f"<Itemize>\n{items_transformed}\n</Itemize>"


        # Function to transform \enumerate environments
        def transform_enumerate(match):
            items = match.group(1)  # Capture the content inside the environment
            # Replace \item with <Item></Item>
            items_transformed = re.sub(r"\\item\s+(.*)", r"<Item>\1</Item>", items)
            # Wrap the environment content with <Enumerate>
            return f"<Enumerate>\n{items_transformed}\n</Enumerate>"


        # Regex to match \itemize environments
        itemize_regex = r"\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}"

        # Regex to match \enumerate environments
        enumerate_regex = r"\\begin\{enumerate\}([\s\S]*?)\\end\{enumerate\}"

        # Apply the transformations
        raw = re.sub(itemize_regex, transform_itemize, raw)
        raw = re.sub(enumerate_regex, transform_enumerate, raw)

        # Regex to match \vspace{} and remove it
        vregex = r"\\vspace\{[^}]*\}"

        # Use re.sub to remove all \vspace commands
        raw = re.sub(vregex, "", raw)

        for tex, html in replacements.items():

            matches = data.find_all(tex)

            for match in list(matches):
                if len(list(match.contents)):
                    raw = raw.replace(str(match).replace(r'\blue {', r'\blue{'),
                                      f"<{html}>{' '.join(list([str(e) for e in match.contents]))}</{html}>")

                    if html != 'em' and html != 'strong' and (html not in required_modules):
                        required_modules.append(html)

        # ADDITIONAL CLEANUP

        raw = raw.replace('<Section>', '<Section title="">')
        raw = raw.replace('<SubSection>', '<SubSection title="">')
        raw = raw.replace('<SubSubSection>', '<SubSubSection title="">')
        # print([e for e in data.subsection.descendants])

        required_modules.append('OrangeText')
        required_modules.append('TealText')

        raw = raw.replace(r'\noindent', '')

        required_modules.append('Enumerate')
        required_modules.append('Item')
        required_modules.append('Itemize')

        patterns = [
            r'\\begin\{equation\}(.*?)\\end\{equation\}',
            r'\\begin\{equation\*\}(.*?)\\end\{equation\*\}',
            r'\\begin\{align\*\}(.*?)\\end\{align\*\}'
        ]


        # Replacement function
        def replace_equation(match):

            content = match.group(1).strip()
            # Extract label if present
            label_match = re.search(r'\\label\{(.*?)\}', content)
            label = label_match.group(1) if label_match else ""
            # Remove the label from the content
            content = re.sub(r'\\label\{.*?\}', '', content).strip()
            # Return the replacement string
            # if "<InlineEquation equation='" in content:
            #    print(1)
            content = content.replace("' />", "\\)")
            content = content.replace('<p>', '').replace('</p>', '').replace('\"', '\'')
            content = content.replace('\\', '\\\\').replace('\n', '')
            return f"<DisplayEquation equation='{content}' title=\"{label}\" />"


        table_regex = r"\\begin{tabular\*}{[^}]*}([\s\S]*?)\\end{tabular\*}"


        def latex_to_html_table(match):
            latex_table = match.group(1).replace("\n", '').replace('\t', '')

            # Split rows by \\ (escaping backslash for regex)
            rows = [row.strip() for row in latex_table.split(r"\\") if row.strip()]

            # Separate the header and content rows
            header_row = None
            content_rows = []
            for row in rows:
                if r"\hline" in row:
                    continue  # Skip \hline rows
                if header_row is None:  # First valid row is treated as the header
                    header_row = row
                else:
                    content_rows.append(row)

            # Convert header row to <thead>
            if header_row:
                header_cols = [col.strip() for col in header_row.split("&")]
                thead = "<thead>\n<tr>\n" + "".join(f"<th>{col}</th>" for col in header_cols) + "\n</tr>\n</thead>"
            else:
                thead = ""

            # Convert content rows to <tbody>
            tbody_rows = []
            for row in content_rows:
                cols = [col.strip() for col in row.split("&")]
                tbody_row = "<tr>\n" + "".join(f"<td>{col}</td>" for col in cols) + "\n</tr>"
                tbody_rows.append(tbody_row)
            tbody = "<tbody>\n" + "\n".join(tbody_rows) + "\n</tbody>"

            # Combine <thead> and <tbody> into <table>
            html_table = "<table border='1'>\n" + thead + "\n" + tbody + "\n</table>"
            return html_table.replace('<p>', '').replace('</p>', '')


        # Replace LaTeX tables with HTML tables
        raw = re.sub(table_regex, latex_to_html_table, raw)

        # Regex to match the entire table* block
        table_star_regex = r"\\begin\{table\*\}[\s\S]*?\\end\{table\*\}"


        # Function to process and remove \label within the matched table* block
        def remove_table_star_and_labels(match):
            table_content = match.group(0)
            # Remove any \label inside the table* block
            table_content = re.sub(r"\\label\{[^}]*\}", "", table_content)
            # Remove \begin{table*} and \end{table*}
            table_content = re.sub(r"\\begin\{table\*\}|\\end\{table\*\}", "", table_content)
            return table_content.strip().replace('[h]', '').replace(r'\small', '')


        # Apply the regex to transform the content
        raw = re.sub(table_star_regex, remove_table_star_and_labels, raw)

        # Perform the replacement
        for pattern in patterns:
            raw = re.sub(pattern, replace_equation, raw, flags=re.DOTALL)

        inline_equations = re.findall(r'\$([^$]*)\$', raw)

        if len(inline_equations): required_modules.append('InlineEquation')

        for eq in inline_equations:
            if len(eq)>0:
                db_backslash = eq.replace('\\', '\\\\').replace('\n', '')
                raw = raw.replace(f'${eq}$', f'<InlineEquation equation="{db_backslash}" />')

        required_modules.append('DisplayEquation')

        display_equations = re.findall(r'\[(.*)\]', raw)


        for eq in display_equations:
            if len(eq)>0:
                db_backslash = eq.replace('\\', '\\\\').replace('\n', '')
                if r'\[%s]' % (eq) in raw and ('DisplayEquation' not in required_modules): required_modules.append(
                    'DisplayEquation')
                raw = raw.replace(r'\[%s]' % (eq), f'<DisplayEquation equation="{db_backslash}" />')


        display_equations2 = re.findall(r'\$\$(.*)\$\$', raw)
        for eq in display_equations2:
            if len(eq) > 0:
                db_backslash = eq.replace('\\', '\\\\').replace('\n', '')
                if r'$$%s$$' % (eq) in raw and ('DisplayEquation' not in required_modules): required_modules.append(
                    'DisplayEquation')
                raw = raw.replace(r'$$%s$$' % (eq), f'<DisplayEquation equation="{db_backslash}" />')

        imports = 'import Layout from "../../layouts/Layout.astro" \n'

        for comp in required_modules:
            imports += f'import {comp} from "../../components/{comp}.astro" \n'

        figregex = r"\\begin\{figure\}.*?\\end\{figure\}"

        # Use re.sub to remove all figure environments
        raw = re.sub(figregex, "", raw, flags=re.DOTALL)

        # Remove matching <p> tags
        raw = re.sub(r"<p>\s*%+\s*</p>", "", raw)

        # print(imports)

        raw = '---\n' + imports + '---\n' + f'<Layout title="{filename}">' + '\n' + raw + '\n' + '</Layout>'

        raw = raw.replace("<p></p>", "")

        astro_file = open(astro_path, mode='w+')

        astro_file.write(raw)

        astro_file.close()

for filename in tex_files:
    required_modules = ['Image']

    tex_path = f"tex/{course}/{page}.tex"

    astro_path = f"astro/src/pages/{coursetags[course]}/{filename.lower().replace(' ', '_')}.astro"

    with open(tex_path, 'r+') as file:
        raw = file.read()

        data = TexSoup(raw)

        for match in re.finditer(r'(?<=\n\n)(?!\\)(.*?)(?<!\})(?=\n\n)', raw):
            print(match)