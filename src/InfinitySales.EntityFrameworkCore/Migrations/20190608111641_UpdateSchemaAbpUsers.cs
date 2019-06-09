using Microsoft.EntityFrameworkCore.Migrations;

namespace InfinitySales.Migrations
{
    public partial class UpdateSchemaAbpUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LanguageId",
                table: "AbpUsers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LanguageId",
                table: "AbpUsers",
                nullable: false,
                defaultValue: 0);
        }
    }
}
